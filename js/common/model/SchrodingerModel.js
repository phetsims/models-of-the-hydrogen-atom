// Copyright 2019, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model that models the hydrogen atom as TODO
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
import schrodingerButtonImage from '../../../images/schrodingerButton_png.js';
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from './PredictiveModel.js';

const schrodingerString = modelsOfTheHydrogenAtomStrings.schrodinger;


class SchrodingerModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {}, options );

    assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths' );
    options.hasTransitionWavelengths = true;

    super( schrodingerString, schrodingerButtonImage, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );
export default SchrodingerModel;