import { Component, signal } from '@angular/core';
import { MUTANT_ODYSSEY_PALETTE } from '../../core/data/palettes';
import { PaletteColour } from '../../core/models/palette';
import { listColours, toGimpPalette } from './palette-file';

interface SwatchRow {
  name: string;
  /** The ramp's steps from dark to light, then its muted tone. */
  swatches: PaletteColour[];
}

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss',
})
export class PaletteComponent {
  readonly palette = MUTANT_ODYSSEY_PALETTE;
  readonly colourCount = listColours(this.palette).length;
  /** Every ramp has the same steps, so the first one names the columns. */
  readonly stepNames = [...this.palette.ramps[0].steps.map((step) => step.name), 'muted'];
  readonly rows: SwatchRow[] = this.palette.ramps.map((ramp) => ({
    name: ramp.name,
    swatches: [...ramp.steps, ramp.muted],
  }));
  /** The code copied last, so its swatch can say so. */
  readonly copied = signal<string | null>(null);

  async copy(hex: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(hex);
      this.copied.set(hex);
    } catch {
      // The browser can refuse clipboard access; the code stays on screen to select by hand.
      this.copied.set(null);
    }
  }

  download(): void {
    const file = new Blob([toGimpPalette(this.palette)], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.palette.id}.gpl`;
    link.click();
    // Revoked a moment later: some browsers cancel a download whose URL is revoked at once.
    setTimeout(() => URL.revokeObjectURL(url));
  }
}
