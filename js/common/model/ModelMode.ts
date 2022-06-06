// Copyright 2022, University of Colorado Boulder

/**
 * ModelMode is a union type that determines whether we are running an experiment or viewing a predictive model.
 * We could have used a boolean for this, but a union type presents better in Studio and the PhET-iO API.
 * The string names correspond to the English labels used on the ABSwitch that controls this setting.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const ModelModeValues = [ 'experiment', 'prediction' ] as const;
export type ModelMode = ( typeof ModelModeValues )[number];