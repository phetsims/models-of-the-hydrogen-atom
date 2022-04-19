// Copyright 2019-2021, University of Colorado Boulder

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
import PredictiveModel, { PredictiveModelOptions } from './PredictiveModel.js';

type SelfOptions = {};

type PlumPuddingModelOptions = SelfOptions & Omit<PredictiveModelOptions, 'hasTransitionWavelengths'>;

class PlumPuddingModel extends PredictiveModel {

  constructor( providedOptions?: PlumPuddingModelOptions ) {
    super( modelsOfTheHydrogenAtomStrings.plumPudding, plumPuddingButton_png, providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;