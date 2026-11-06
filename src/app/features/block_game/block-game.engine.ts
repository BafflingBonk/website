export const COLS = 10;
export const ROWS = 20;

const BASE_TICK_MS = 800;
const MIN_TICK_MS = 100;
const TICK_MS_PER_LEVEL = 60;
const LINES_PER_LEVEL = 10;
/** Points for clearing 1–4 lines at once, multiplied by the level. */
const LINE_POINTS = [0, 100, 300, 500, 800];

export type PieceKey = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export type GameState = 'ready' | 'running' | 'paused' | 'over';
type Matrix = number[][];

/** 0 = empty, 1–7 = colour of a piece (see `PIECES`). */
export type CellColor = number;

export interface RenderCell {
  color: CellColor;
  /** True where the falling piece would land; only set on empty cells. */
  ghost: boolean;
}

interface PieceDef {
  color: CellColor;
  /** All rotation states, clockwise, so rotating is just picking the next one. */
  rotations: Matrix[];
}

interface ActivePiece {
  key: PieceKey;
  rotation: number;
  /** Board position of the matrix's top-left corner; may be negative while spawning. */
  row: number;
  col: number;
}

const PIECES: Record<PieceKey, PieceDef> = {
  I: {
    color: 1,
    rotations: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
  O: {
    color: 2,
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  T: {
    color: 3,
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  S: {
    color: 4,
    rotations: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  Z: {
    color: 5,
    rotations: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  J: {
    color: 6,
    rotations: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    ],
  },
  L: {
    color: 7,
    rotations: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
};

const PIECE_KEYS = Object.keys(PIECES) as PieceKey[];

/** Column offsets tried in order when a rotation doesn't fit (simple wall kicks). */
const ROTATION_KICKS = [0, -1, 1, -2, 2];

/**
 * Rules and state of the block game, independent of Angular and timers:
 * the component calls `tick()` on its own schedule (see `getTickMs()`).
 */
export class BlockGameEngine {
  board: CellColor[][] = createEmptyBoard();
  state: GameState = 'ready';
  score = 0;
  lines = 0;
  level = 1;
  nextKey: PieceKey;

  private active!: ActivePiece;
  /** "Bag" of the remaining pieces: every piece comes once per 7 before any repeats. */
  private bag: PieceKey[] = [];

  /** `random` returns [0, 1) like `Math.random`; tests pass a seeded one. */
  constructor(private readonly random: () => number = Math.random) {
    this.nextKey = this.drawFromBag();
    this.spawnPiece();
  }

  /** Clears everything and goes back to the 'ready' state. */
  reset(): void {
    this.board = createEmptyBoard();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.bag = [];
    this.nextKey = this.drawFromBag();
    this.state = 'ready';
    this.spawnPiece();
  }

  start(): void {
    if (this.state === 'ready') {
      this.state = 'running';
    }
  }

  togglePause(): void {
    if (this.state === 'running') {
      this.state = 'paused';
    } else if (this.state === 'paused') {
      this.state = 'running';
    }
  }

  /** Time between gravity steps at the current level. */
  getTickMs(): number {
    return Math.max(MIN_TICK_MS, BASE_TICK_MS - (this.level - 1) * TICK_MS_PER_LEVEL);
  }

  /** One gravity step: fall a row, or lock the piece if it can't. */
  tick(): void {
    if (this.state !== 'running') {
      return;
    }
    if (!this.tryShift(1, 0)) {
      this.lockPiece();
    }
  }

  move(deltaCol: -1 | 1): boolean {
    return this.state === 'running' && this.tryShift(0, deltaCol);
  }

  rotate(): boolean {
    if (this.state !== 'running') {
      return false;
    }
    const def = PIECES[this.active.key];
    const rotation = (this.active.rotation + 1) % def.rotations.length;
    for (const kick of ROTATION_KICKS) {
      const trial = { ...this.active, rotation, col: this.active.col + kick };
      if (!this.collides(trial)) {
        this.active = trial;
        return true;
      }
    }
    return false;
  }

  /** Moves down one row for 1 point; locks the piece if it is already resting. */
  softDrop(): void {
    if (this.state !== 'running') {
      return;
    }
    if (this.tryShift(1, 0)) {
      this.score += 1;
    } else {
      this.lockPiece();
    }
  }

  /** Drops the piece to the bottom (2 points per row) and locks it. */
  hardDrop(): void {
    if (this.state !== 'running') {
      return;
    }
    while (this.tryShift(1, 0)) {
      this.score += 2;
    }
    this.lockPiece();
  }

  /** The board as it should be drawn: locked cells, the falling piece and its ghost. */
  getRenderCells(): RenderCell[] {
    const cells: RenderCell[] = this.board.flat().map((color) => ({ color, ghost: false }));
    const color = PIECES[this.active.key].color;
    const ghost = { ...this.active, row: this.getLandingRow() };

    if (this.state !== 'over') {
      for (const [row, col] of this.getOccupied(ghost)) {
        if (row >= 0 && cells[row * COLS + col].color === 0) {
          cells[row * COLS + col].ghost = true;
        }
      }
    }
    for (const [row, col] of this.getOccupied(this.active)) {
      if (row >= 0) {
        cells[row * COLS + col] = { color, ghost: false };
      }
    }
    return cells;
  }

  /** The next piece's spawn shape without its empty rows, for the preview box. */
  getNextPreview(): CellColor[][] {
    const def = PIECES[this.nextKey];
    return def.rotations[0]
      .filter((row) => row.some((filled) => filled))
      .map((row) => row.map((filled) => (filled ? def.color : 0)));
  }

  private getLandingRow(): number {
    let row = this.active.row;
    while (!this.collides({ ...this.active, row: row + 1 })) {
      row++;
    }
    return row;
  }

  private tryShift(deltaRow: number, deltaCol: number): boolean {
    const trial = {
      ...this.active,
      row: this.active.row + deltaRow,
      col: this.active.col + deltaCol,
    };
    if (this.collides(trial)) {
      return false;
    }
    this.active = trial;
    return true;
  }

  private collides(piece: ActivePiece): boolean {
    return this.getOccupied(piece).some(
      ([row, col]) =>
        col < 0 || col >= COLS || row >= ROWS || (row >= 0 && this.board[row][col] !== 0),
    );
  }

  /** Board [row, col] of every filled cell of a piece. */
  private getOccupied(piece: ActivePiece): [number, number][] {
    const matrix = PIECES[piece.key].rotations[piece.rotation];
    const occupied: [number, number][] = [];
    matrix.forEach((cells, row) =>
      cells.forEach((filled, col) => {
        if (filled) {
          occupied.push([piece.row + row, piece.col + col]);
        }
      }),
    );
    return occupied;
  }

  private lockPiece(): void {
    const color = PIECES[this.active.key].color;
    let lockedAboveBoard = false;
    for (const [row, col] of this.getOccupied(this.active)) {
      if (row < 0) {
        lockedAboveBoard = true;
      } else {
        this.board[row][col] = color;
      }
    }
    this.clearLines();
    if (lockedAboveBoard) {
      this.state = 'over';
      return;
    }
    this.spawnPiece();
  }

  private clearLines(): void {
    const remaining = this.board.filter((row) => row.some((cell) => cell === 0));
    const cleared = ROWS - remaining.length;
    if (cleared === 0) {
      return;
    }
    const empty = Array.from({ length: cleared }, () => Array<CellColor>(COLS).fill(0));
    this.board = [...empty, ...remaining];
    this.score += LINE_POINTS[cleared] * this.level;
    this.lines += cleared;
    this.level = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
  }

  private spawnPiece(): void {
    const key = this.nextKey;
    this.nextKey = this.drawFromBag();
    const width = PIECES[key].rotations[0][0].length;
    this.active = { key, rotation: 0, row: 0, col: Math.floor((COLS - width) / 2) };

    // The I piece's first row is empty; start it one row higher so it appears at the top.
    if (key === 'I') {
      this.active.row = -1;
    }
    if (this.collides(this.active)) {
      this.state = 'over';
    }
  }

  private drawFromBag(): PieceKey {
    if (this.bag.length === 0) {
      this.bag = [...PIECE_KEYS];
    }
    const index = Math.floor(this.random() * this.bag.length);
    return this.bag.splice(index, 1)[0];
  }
}

function createEmptyBoard(): CellColor[][] {
  return Array.from({ length: ROWS }, () => Array<CellColor>(COLS).fill(0));
}
