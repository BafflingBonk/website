import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MUTANT_ODYSSEY_PALETTE } from '../../core/data/palettes';
import { PaletteComponent } from './palette.component';
import { listColours } from './palette-file';

describe('PaletteComponent', () => {
  let fixture: ComponentFixture<PaletteComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PaletteComponent] }).compileComponents();
    fixture = TestBed.createComponent(PaletteComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a swatch for every colour of the palette', () => {
    expect(element.querySelectorAll('.chip').length).toBe(
      listColours(MUTANT_ODYSSEY_PALETTE).length,
    );
  });

  it('copies a code when its swatch is selected and says so', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const first = MUTANT_ODYSSEY_PALETTE.ramps[0].steps[0].hex;

    element.querySelector<HTMLButtonElement>('.chip')!.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith(first);
    expect(element.querySelector('.recipe')?.textContent?.trim()).toBe('Copied');
  });
});
