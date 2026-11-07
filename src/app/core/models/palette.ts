/** One colour of a palette and how it was mixed. */
export interface PaletteColour {
  /** The step or role, e.g. `deep`, `base` or `fog`. */
  name: string;
  /** `#rrggbb`. */
  hex: string;
  /** How it was mixed, e.g. `1:1 with teal`. */
  recipe: string;
  /** One of the colours the palette was mixed from. */
  base?: boolean;
}

/** One base colour with its shades from darkest to lightest, plus a muted tone. */
export interface PaletteRamp {
  name: string;
  steps: PaletteColour[];
  muted: PaletteColour;
}

export interface Palette {
  /** Unique; also the name of the downloaded palette file. */
  id: string;
  title: string;
  ramps: PaletteRamp[];
  /** Shared by every ramp: the darkest darks, greys and the lightest light. */
  neutrals: PaletteColour[];
}
