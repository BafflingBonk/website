import { BlockGameEngine, COLS, ROWS } from './block-game.engine';

// With random() = 0 the bag always hands out its first piece: I, O, T, S, Z, J, L.
function createEngine(random: () => number = () => 0): BlockGameEngine {
  const engine = new BlockGameEngine(random);
  engine.start();
  return engine;
}

function filledColumns(cells: { color: number }[], row: number): number[] {
  return cells
    .slice(row * COLS, (row + 1) * COLS)
    .flatMap((cell, col) => (cell.color !== 0 ? [col] : []));
}

describe('BlockGameEngine', () => {
  it('waits in the ready state until started', () => {
    const engine = new BlockGameEngine(() => 0);
    const before = filledColumns(engine.getRenderCells(), 0);

    engine.tick();
    engine.hardDrop();

    expect(engine.state).toBe('ready');
    expect(filledColumns(engine.getRenderCells(), 0)).toEqual(before);
  });

  it('spawns the first I piece in the top row, centred', () => {
    const engine = createEngine();
    expect(filledColumns(engine.getRenderCells(), 0)).toEqual([3, 4, 5, 6]);
  });

  it('falls one row per tick', () => {
    const engine = createEngine();
    engine.tick();
    const cells = engine.getRenderCells();
    expect(filledColumns(cells, 0)).toEqual([]);
    expect(filledColumns(cells, 1)).toEqual([3, 4, 5, 6]);
  });

  it('stops at the walls', () => {
    const engine = createEngine();
    for (let i = 0; i < 10; i++) {
      engine.move(-1);
    }
    expect(filledColumns(engine.getRenderCells(), 0)).toEqual([0, 1, 2, 3]);
    expect(engine.move(-1)).toBe(false);
  });

  it('hard drops to the floor, scores 2 per row and spawns the next piece', () => {
    const engine = createEngine();
    engine.hardDrop();

    expect(engine.board[ROWS - 1].slice(3, 7)).toEqual([1, 1, 1, 1]);
    expect(engine.score).toBe(2 * (ROWS - 1));
    expect(engine.nextKey).toBe('T');
  });

  it('scores soft drops only when the piece actually moves', () => {
    const engine = createEngine();
    engine.softDrop();
    expect(engine.score).toBe(1);

    for (let i = 0; i < ROWS; i++) {
      engine.tick(); // gravity alone brings it to the floor; the last tick locks it
    }
    expect(engine.board[ROWS - 1].slice(3, 7)).toEqual([1, 1, 1, 1]);
    expect(engine.score).toBe(1);
  });

  it('shows a ghost where the piece will land', () => {
    const engine = createEngine();
    const ghostColumns = engine
      .getRenderCells()
      .slice((ROWS - 1) * COLS)
      .flatMap((cell, col) => (cell.ghost ? [col] : []));
    expect(ghostColumns).toEqual([3, 4, 5, 6]);
  });

  it('kicks off a wall when a rotation would not fit', () => {
    const engine = createEngine();
    engine.rotate(); // I becomes vertical
    for (let i = 0; i < 10; i++) {
      engine.move(-1);
    }
    expect(engine.rotate()).toBe(true);
    expect(filledColumns(engine.getRenderCells(), 0)).toEqual([0, 1, 2, 3]);
  });

  it('clears a full line and scores it by level', () => {
    const engine = createEngine();
    engine.board[ROWS - 1] = [1, 1, 1, 0, 0, 0, 0, 1, 1, 1];

    engine.hardDrop();

    expect(engine.lines).toBe(1);
    expect(engine.score).toBe(2 * (ROWS - 1) + 100);
    expect(engine.board[ROWS - 1].every((cell) => cell === 0)).toBe(true);
  });

  it('levels up every 10 lines and falls faster', () => {
    const engine = createEngine();
    engine.lines = 9;
    engine.board[ROWS - 1] = [1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
    const slowTick = engine.getTickMs();

    engine.hardDrop();

    expect(engine.level).toBe(2);
    expect(engine.getTickMs()).toBeLessThan(slowTick);
  });

  it('ignores input while paused', () => {
    const engine = createEngine();
    engine.togglePause();
    engine.tick();
    engine.hardDrop();

    expect(engine.state).toBe('paused');
    expect(engine.score).toBe(0);
    expect(filledColumns(engine.getRenderCells(), 0)).toEqual([3, 4, 5, 6]);

    engine.togglePause();
    expect(engine.state).toBe('running');
  });

  it('ends the game when a new piece has no room', () => {
    const engine = createEngine();
    for (let row = 1; row < ROWS; row++) {
      engine.board[row] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    engine.hardDrop(); // the I piece locks in row 0; the O piece can't spawn

    expect(engine.state).toBe('over');
    engine.move(1);
    expect(engine.state).toBe('over');
  });

  it('hands out every piece once per bag of 7', () => {
    // With random() = 0.99 the bag hands out its last piece first: L, J, Z, S, T, O, I.
    const fresh = createEngine(() => 0.99);
    const sequence: string[] = [];
    for (let i = 0; i < 7; i++) {
      sequence.push(fresh.nextKey);
      fresh.hardDrop();
      fresh.board = fresh.board.map((row) => row.map(() => 0));
    }
    // First piece was L; the rest of the bag follows, then a new bag starts with L.
    expect(sequence).toEqual(['J', 'Z', 'S', 'T', 'O', 'I', 'L']);
  });

  it('resets to a fresh ready game', () => {
    const engine = createEngine();
    engine.hardDrop();
    engine.reset();

    expect(engine.state).toBe('ready');
    expect(engine.score).toBe(0);
    expect(engine.board.flat().every((cell) => cell === 0)).toBe(true);
  });
});
