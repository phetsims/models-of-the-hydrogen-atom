// Copyright 2022-2023, University of Colorado Boulder

/**
 * ExperimentModel is the model when we are in "Experiment" mode. It is identical to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type ExperimentModelOptions = SelfOptions & SchrodingerModelOptions;

export default class ExperimentModel extends SchrodingerModel {

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: ExperimentModelOptions ) {

    const options = optionize<ExperimentModelOptions, SelfOptions, SchrodingerModelOptions>()( {

      // SchrodingerModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.experimentStringProperty
    }, providedOptions );

    super( zoomedInBox, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentModel', ExperimentModel );