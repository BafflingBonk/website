import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { BlockGameEngine } from './block-game.engine';

const BEST_SCORE_KEY = 'block-game-best';

type Action = 'left' | 'right' | 'rotate' | 'softDrop' | 'hardDrop' | 'pause' | 'confirm';

const KEY_ACTIONS: Record<string, Action> = {
  ArrowLeft: 'left',
  a: 'left',
  ArrowRight: 'right',
  d: 'right',
  ArrowUp: 'rotate',
  w: 'rotate',
  x: 'rotate',
  ArrowDown: 'softDrop',
  s: 'softDrop',
  ' ': 'hardDrop',
  p: 'pause',
  Escape: 'pause',
  Enter: 'confirm',
};

/** Holding a key repeats these; the others fire once per press. */
const REPEATABLE: ReadonlySet<Action> = new Set(['left', 'right', 'softDrop']);

@Component({
  selector: 'app-block-game',
  templateUrl: './block-game.component.html',
  styleUrl: './block-game.component.scss',
  host: {
    '(window:keydown)': 'onKeydown($event)',
    '(document:visibilitychange)': 'onVisibilityChange()',
  },
})
export class BlockGameComponent {
  private readonly engine: BlockGameEngine;
  private timerId: ReturnType<typeof setTimeout> | undefined;

  /** Bumped after every engine change; the engine itself isn't reactive. */
  private readonly frame = signal(0);
  private readonly snapshot = computed(() => {
    this.frame();
    return {
      cells: this.engine.getRenderCells(),
      preview: this.engine.getNextPreview(),
      state: this.engine.state,
      score: this.engine.score,
      lines: this.engine.lines,
      level: this.engine.level,
    };
  });

  readonly cells = computed(() => this.snapshot().cells);
  readonly preview = computed(() => this.snapshot().preview);
  readonly state = computed(() => this.snapshot().state);
  readonly score = computed(() => this.snapshot().score);
  readonly lines = computed(() => this.snapshot().lines);
  readonly level = computed(() => this.snapshot().level);
  readonly bestScore = signal(readBestScore());

  constructor() {
    this.engine = new BlockGameEngine();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timerId));
  }

  start(): void {
    if (this.engine.state === 'over') {
      this.engine.reset();
    }
    this.engine.start();
    this.afterChange();
  }

  togglePause(): void {
    this.engine.togglePause();
    this.afterChange();
  }

  press(action: Action): void {
    const engine = this.engine;
    switch (action) {
      case 'left':
        engine.move(-1);
        break;
      case 'right':
        engine.move(1);
        break;
      case 'rotate':
        engine.rotate();
        break;
      case 'softDrop':
        engine.softDrop();
        break;
      case 'hardDrop':
        engine.hardDrop();
        break;
      case 'pause':
        engine.togglePause();
        break;
      case 'confirm':
        if (engine.state === 'paused') {
          engine.togglePause();
        } else if (engine.state !== 'running') {
          this.start();
          return;
        }
        break;
    }
    this.afterChange(action === 'softDrop');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey || handlesOwnKeys(event.target)) {
      return;
    }
    const action = KEY_ACTIONS[event.key.length === 1 ? event.key.toLowerCase() : event.key];
    if (!action || !this.isActionAvailable(action)) {
      return;
    }
    // Only take over keys the game uses right now, so arrows and space still scroll otherwise.
    event.preventDefault();
    if (event.repeat && !REPEATABLE.has(action)) {
      return;
    }
    // Space or Enter would also "click" a focused button such as Start.
    (document.activeElement as HTMLElement | null)?.blur();
    this.press(action);
  }

  onVisibilityChange(): void {
    if (document.hidden && this.engine.state === 'running') {
      this.togglePause();
    }
  }

  private isActionAvailable(action: Action): boolean {
    const state = this.engine.state;
    if (action === 'confirm') {
      return state !== 'running';
    }
    if (action === 'pause') {
      return state === 'running' || state === 'paused';
    }
    if (action === 'hardDrop' && state === 'ready') {
      return false;
    }
    return state === 'running';
  }

  /** Redraws, saves a new best score and keeps the gravity timer in step with the state. */
  private afterChange(resetGravity = false): void {
    this.frame.update((frame) => frame + 1);

    if (this.engine.score > this.bestScore()) {
      this.bestScore.set(this.engine.score);
      saveBestScore(this.engine.score);
    }

    if (this.engine.state !== 'running') {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    } else if (resetGravity || this.timerId === undefined) {
      this.scheduleTick();
    }
  }

  private scheduleTick(): void {
    clearTimeout(this.timerId);
    // Re-read each time: the delay shrinks as the level goes up.
    this.timerId = setTimeout(() => {
      this.timerId = undefined;
      this.engine.tick();
      this.afterChange();
    }, this.engine.getTickMs());
  }
}

/** Elements whose own keyboard handling must win: text fields, and links (Enter follows them). */
function handlesOwnKeys(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'A'].includes(target.tagName))
  );
}

function readBestScore(): number {
  try {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBestScore(score: number): void {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Storage can be blocked; the best score then only lasts for this visit.
  }
}
