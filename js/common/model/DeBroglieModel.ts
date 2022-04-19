// Copyright 2019-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * DeBroglieModel is a predictive model that models the hydrogen atom as TODO
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

import merge from '../../../../phet-core/js/merge.js';
import deBroglieButton_png from '../../../images/deBroglieButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel from './PredictiveModel.js';

class DeBroglieModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {}, options );

    assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths' );
    options.hasTransitionWavelengths = true;

    super( modelsOfTheHydrogenAtomStrings.deBroglie, deBroglieButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );
export default DeBroglieModel;