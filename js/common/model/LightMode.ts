// Copyright 2022, University of Colorado Boulder

/**
 * LightMode is a union type for the modes of the light.
 * We could have used a boolean for this, but a union type presents better in Studio and the PhET-iO API.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const LightModeValues = [ 'white', 'monochromatic' ] as const;
export type LightMode = ( typeof LightModeValues )[number];