// Copyright 2019-2022, University of Colorado Boulder

/**
 * ClassicalSolarSystemModel is a predictive model that models the hydrogen atom as TODO
 *
 * Physical representation:
 * TODO
 *
 * Collision behavior:
 * TODO
 *
 * Absorption behavior:
 * TODO
 *
 * Emission behavior:
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import classicalSolarSystemButton_png from '../../../images/classicalSolarSystemButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel, { PredictiveModelOptions } from './PredictiveModel.js';

type SelfOptions = {};

type ClassicalSolarSystemModelOptions = SelfOptions & Omit<PredictiveModelOptions, 'hasTransitionWavelengths'>;

export default class ClassicalSolarSystemModel extends PredictiveModel {

  constructor( providedOptions: ClassicalSolarSystemModelOptions ) {

    const options = optionize<ClassicalSolarSystemModelOptions, SelfOptions, PredictiveModelOptions>()( {

      // PredictiveModelOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );