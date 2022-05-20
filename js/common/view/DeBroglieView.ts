// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieView a union type for the different "view" representations for the deBroglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DeBroglieViewValues = [
  'radial', // maps amplitude to radial distance in 2D
  'threeD', // maps amplitude to height in 3D
  'brightness' // maps amplitude to brightness in 2D
] as const;

export type DeBroglieView = ( typeof DeBroglieViewValues )[number];