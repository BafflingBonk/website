import { MUTANT_ODYSSEY_PALETTE } from '../../core/data/palettes';
import { listColours, toGimpPalette } from './palette-file';

describe('toGimpPalette', () => {
  const lines = toGimpPalette(MUTANT_ODYSSEY_PALETTE).trimEnd().split('\n');

  it('starts with the header Aseprite expects', () => {
    expect(lines.slice(0, 3)).toEqual(['GIMP Palette', 'Name: Mutant Odyssey', 'Columns: 6']);
  });

  it('lists every colour once, as its RGB values', () => {
    const colours = listColours(MUTANT_ODYSSEY_PALETTE);
    const entries = lines.slice(3);

    expect(entries.length).toBe(colours.length);
    entries.forEach((entry, index) => {
      const rgb = entry.split('\t')[0].trim().split(/\s+/).map(Number);
      const hex = '#' + rgb.map((value) => value.toString(16).padStart(2, '0')).join('');
      expect(hex).toBe(colours[index].hex);
    });
  });
});

describe('MUTANT_ODYSSEY_PALETTE', () => {
  it('has every colour once, written as #rrggbb', () => {
    const hexes = listColours(MUTANT_ODYSSEY_PALETTE).map((colour) => colour.hex);

    expect(new Set(hexes).size).toBe(hexes.length);
    hexes.forEach((hex) => expect(hex).toMatch(/^#[0-9a-f]{6}$/));
  });

  it('gives every ramp the same steps, so the columns line up', () => {
    const steps = MUTANT_ODYSSEY_PALETTE.ramps.map((ramp) => ramp.steps.map((step) => step.name));

    steps.forEach((names) => expect(names).toEqual(steps[0]));
  });
});
