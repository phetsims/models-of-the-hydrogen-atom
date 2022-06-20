// Copyright 2022, University of Colorado Boulder

//TODO rename to DeBroglieRepresentation or DeBrogliePresentation
/**
 * DeBroglieView is a union type for the different representations of the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DeBroglieViewValues = [
  'radial', // maps amplitude to radial distance in 2D
  '3D', // maps amplitude to height in 3D
  'brightness' // maps amplitude to brightness in 2D
] as const;

export type DeBroglieView = ( typeof DeBroglieViewValues )[number];