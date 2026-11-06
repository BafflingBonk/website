import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockGameComponent } from './block-game.component';
import { COLS, ROWS } from './block-game.engine';

describe('BlockGameComponent', () => {
  let fixture: ComponentFixture<BlockGameComponent>;
  let element: HTMLElement;

  function pressKey(key: string): void {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, cancelable: true }));
    fixture.detectChanges();
  }

  function filledCells(): number {
    return element.querySelectorAll('.board .cell:not([data-color="0"])').length;
  }

  beforeEach(async () => {
    vi.useFakeTimers();
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [BlockGameComponent] }).compileComponents();

    fixture = TestBed.createComponent(BlockGameComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
  });

  it('draws the whole board with the first piece and waits for a start', () => {
    expect(element.querySelectorAll('.board .cell').length).toBe(ROWS * COLS);
    expect(filledCells()).toBe(4);
    expect(element.querySelector('.overlay h2')?.textContent).toContain('Ready');
  });

  it('starts with Enter and lets gravity pull the piece down', () => {
    pressKey('Enter');
    expect(element.querySelector('.overlay')).toBeNull();

    vi.advanceTimersByTime(800 * ROWS);
    fixture.detectChanges();
    // After enough ticks the first piece has locked and a second one is falling.
    expect(filledCells()).toBeGreaterThanOrEqual(8);
  });

  it('pauses with P and stops the gravity timer', () => {
    pressKey('Enter');
    pressKey('p');
    expect(element.querySelector('.overlay h2')?.textContent).toContain('Paused');

    const before = element.querySelector('.board')!.innerHTML;
    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(element.querySelector('.board')!.innerHTML).toBe(before);
  });

  it('hard drops with Space and saves the best score', () => {
    pressKey('Enter');
    pressKey(' ');

    const score = Number(element.querySelector('.stat .value')?.textContent);
    expect(score).toBeGreaterThan(0);
    expect(localStorage.getItem('block-game-best')).toBe(String(score));
  });

  it('leaves the arrow keys alone until the game is running', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
