// Copyright 2019-2022, University of Colorado Boulder

/**
 * ExperimentModel is the model when we are in "Experiment" mode. It is identical to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type ExperimentModelOptions = SelfOptions & SchrodingerModelOptions;

export default class ExperimentModel extends SchrodingerModel {

  constructor( providedOptions: ExperimentModelOptions ) {
    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentModel', ExperimentModel );