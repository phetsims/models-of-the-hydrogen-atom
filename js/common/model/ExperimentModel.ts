// Copyright 2022, University of Colorado Boulder

/**
 * ExperimentModel is the model when we are in "Experiment" mode. It is identical to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

type ExperimentModelOptions = SelfOptions & SchrodingerModelOptions;

export default class ExperimentModel extends SchrodingerModel {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: ExperimentModelOptions ) {
    super( zoomedInBox, providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentModel', ExperimentModel );