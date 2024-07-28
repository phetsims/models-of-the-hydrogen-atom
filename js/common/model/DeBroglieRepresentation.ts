// Copyright 2022-2024, University of Colorado Boulder

/**
 * DeBroglieRepresentation is a union type for the different representations of the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DeBroglieRepresentationValues = [
  'radial', // maps amplitude to radial distance in 2D
  '3D', // maps amplitude to height in 3D
  'brightness' // maps amplitude to brightness in 2D
] as const;

export type DeBroglieRepresentation = ( typeof DeBroglieRepresentationValues )[number];