// Copyright 2019-2021, University of Colorado Boulder

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

import classicalSolarSystemButton_png from '../../../images/classicalSolarSystemButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel, { PredictiveModelOptions } from './PredictiveModel.js';

type SelfOptions = {};

type ClassicalSolarSystemModelOptions = SelfOptions & Omit<PredictiveModelOptions, 'hasTransitionWavelengths'>;

export default class ClassicalSolarSystemModel extends PredictiveModel {

  constructor( providedOptions?: ClassicalSolarSystemModelOptions ) {
    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButton_png, providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );