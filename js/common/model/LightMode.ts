// Copyright 2022, University of Colorado Boulder

/**
 * LightMode enumerates the modes for the light that is emitted by the light source.
 * We could have used a boolean for this, but a string union type presents better in Studio and the PhET-iO API.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const LightModeValues = [ 'white', 'monochromatic' ] as const;
export type LightMode = ( typeof LightModeValues )[number];