// Copyright 2022-2024, University of Colorado Boulder

/**
 * Experiment is the model when we are in "Experiment" mode. It is identical to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Light from './Light.js';
import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';

type SelfOptions = EmptySelfOptions;

type ExperimentOptions = SelfOptions & PickRequired<SchrodingerModelOptions, 'tandem'>;

export default class Experiment extends SchrodingerModel {

  public constructor( light: Light, providedOptions: ExperimentOptions ) {

    const options = optionize<ExperimentOptions, SelfOptions, SchrodingerModelOptions>()( {

      // SchrodingerModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.experimentStringProperty
    }, providedOptions );

    super( light, options );
  }
}

modelsOfTheHydrogenAtom.register( 'Experiment', Experiment );