// Copyright 2019-2020, University of Colorado Boulder

/**
 * PlumPudding is a predictive model that models the hydrogen atom as TODO
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

import plumPuddingButton_png from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel from './PredictiveModel.js';

class PlumPuddingModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( modelsOfTheHydrogenAtomStrings.plumPudding, plumPuddingButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;