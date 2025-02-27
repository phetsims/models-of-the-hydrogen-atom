// Copyright 2022-2025, University of Colorado Boulder

/**
 * Experiment is the model when we are in "Experiment" mode. It is identical to the Schrödinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import LightSource from './LightSource.js';
import SchrodingerModel, { SchrodingerModelOptions } from './SchrodingerModel.js';

type SelfOptions = EmptySelfOptions;

type ExperimentOptions = SelfOptions & PickRequired<SchrodingerModelOptions, 'tandem'>;

export default class Experiment extends SchrodingerModel {

  public constructor( position: Vector2, lightSource: LightSource, providedOptions: ExperimentOptions ) {

    const options = optionize<ExperimentOptions, SelfOptions, SchrodingerModelOptions>()( {

      // SchrodingerModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.experimentStringProperty
    }, providedOptions );

    super( position, lightSource, options );
  }
}

modelsOfTheHydrogenAtom.register( 'Experiment', Experiment );