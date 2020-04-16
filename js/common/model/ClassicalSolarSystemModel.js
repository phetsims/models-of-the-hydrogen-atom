// Copyright 2019-2020, University of Colorado Boulder

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

import classicalSolarSystemButtonImage from '../../../images/classicalSolarSystemButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel from './PredictiveModel.js';

class ClassicalSolarSystemModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButtonImage, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );
export default ClassicalSolarSystemModel;