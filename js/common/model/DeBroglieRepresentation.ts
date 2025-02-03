// Copyright 2022-2024, University of Colorado Boulder

/**
 * DeBroglieRepresentation enumerates the different view representations for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DeBroglieRepresentationValues = [
  'radialDistance', // maps amplitude to radial distance in 2D
  '3DHeight',       // maps amplitude to height in 3D
  'brightness'      // maps amplitude to brightness in 2D
] as const;

export type DeBroglieRepresentation = ( typeof DeBroglieRepresentationValues )[number];