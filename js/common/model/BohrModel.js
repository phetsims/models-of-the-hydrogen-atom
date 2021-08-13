// Copyright 2019-2020, University of Colorado Boulder

/**
 * BohrModel is a predictive model that models the hydrogen atom as TODO
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
import bohrButton_png from '../../../images/bohrButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel from './PredictiveModel.js';

class BohrModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {}, options );

    assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths' );
    options.hasTransitionWavelengths = true;

    super( modelsOfTheHydrogenAtomStrings.bohr, bohrButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );
export default BohrModel;