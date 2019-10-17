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
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );

  // strings
  const schrodingerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/schrodinger' );

  // images
  const schrodingerButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/schrodingerButton.png' );

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

  return modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );
} );