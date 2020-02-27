// Copyright 2019, University of Colorado Boulder

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
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from './PredictiveModel.js';

const classicalSolarSystemString = modelsOfTheHydrogenAtomStrings.classicalSolarSystem;


class ClassicalSolarSystemModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( classicalSolarSystemString, classicalSolarSystemButtonImage, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );
export default ClassicalSolarSystemModel;