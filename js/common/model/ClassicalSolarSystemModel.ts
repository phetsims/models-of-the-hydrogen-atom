// Copyright 2019-2021, University of Colorado Boulder

// @ts-nocheck
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
import PredictiveModel from './PredictiveModel.js';

class ClassicalSolarSystemModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );
export default ClassicalSolarSystemModel;