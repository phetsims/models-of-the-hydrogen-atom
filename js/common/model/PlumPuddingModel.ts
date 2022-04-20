// Copyright 2019-2022, University of Colorado Boulder

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

import optionize from '../../../../phet-core/js/optionize.js';
import plumPuddingButton_png from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel, { PredictiveModelOptions } from './PredictiveModel.js';

type SelfOptions = {};

type PlumPuddingModelOptions = SelfOptions & Omit<PredictiveModelOptions, 'hasTransitionWavelengths'>;

class PlumPuddingModel extends PredictiveModel {

  constructor( providedOptions: PlumPuddingModelOptions ) {

    const options = optionize<PlumPuddingModelOptions, SelfOptions, PredictiveModelOptions>()( {

      // PredictiveModelOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.plumPudding, plumPuddingButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;