// Copyright 2019, University of Colorado Boulder

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

import plumPuddingButtonImage from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from './PredictiveModel.js';

const plumPuddingString = modelsOfTheHydrogenAtomStrings.plumPudding;


class PlumPuddingModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( plumPuddingString, plumPuddingButtonImage, options );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;