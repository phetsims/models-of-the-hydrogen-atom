// Copyright 2019-2020, University of Colorado Boulder

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
import deBroglieButtonImage from '../../../images/deBroglieButton_png.js';
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from './PredictiveModel.js';

const deBroglieString = modelsOfTheHydrogenAtomStrings.deBroglie;


class DeBroglieModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {}, options );

    assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths' );
    options.hasTransitionWavelengths = true;

    super( deBroglieString, deBroglieButtonImage, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );
export default DeBroglieModel;