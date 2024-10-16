// Copyright 2022-2024, University of Colorado Boulder

//TODO Uninstrument aspects of superclass SchrodingerModel that do not need to be stateful and should not be exposed in PhET-iO.

/**
 * Experiment is the model when we are in "Experiment" mode. It is identical to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Light from './Light.js';

type SelfOptions = EmptySelfOptions;

type ExperimentOptions = SelfOptions & PickRequired<SchrodingerModelOptions, 'tandem'>;

export default class Experiment extends SchrodingerModel {

  public constructor( zoomedInBox: ZoomedInBox, light: Light, providedOptions: ExperimentOptions ) {

    const options = optionize<ExperimentOptions, SelfOptions, SchrodingerModelOptions>()( {

      // SchrodingerModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.experimentStringProperty
    }, providedOptions );

    super( zoomedInBox, light, options );
  }
}

modelsOfTheHydrogenAtom.register( 'Experiment', Experiment );