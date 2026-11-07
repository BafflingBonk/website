import { Palette, PaletteColour } from '../../core/models/palette';

/** Every colour in the order a palette file lists it: each ramp dark to light, the muted tones, the neutrals. */
export function listColours(palette: Palette): PaletteColour[] {
  return [
    ...palette.ramps.flatMap((ramp) => ramp.steps),
    ...palette.ramps.map((ramp) => ramp.muted),
    ...palette.neutrals,
  ];
}

/** The palette as a GIMP palette (`.gpl`), the plain-text format Aseprite loads. */
export function toGimpPalette(palette: Palette): string {
  const label = (colour: PaletteColour, group: string): string =>
    `${group} ${colour.name} ${colour.hex} (${colour.recipe})`;
  const line = (colour: PaletteColour, group: string): string => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(colour.hex.slice(i, i + 2), 16));
    return `${[r, g, b].map((value) => String(value).padStart(3)).join(' ')}\t${label(colour, group)}`;
  };

  return [
    'GIMP Palette',
    `Name: ${palette.title}`,
    'Columns: 6',
    ...palette.ramps.flatMap((ramp) => ramp.steps.map((colour) => line(colour, ramp.name))),
    ...palette.ramps.map((ramp) => line(ramp.muted, ramp.name)),
    ...palette.neutrals.map((colour) => line(colour, 'Neutral')),
    '',
  ].join('\n');
}
