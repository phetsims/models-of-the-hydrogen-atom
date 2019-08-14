// Copyright 2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );

  // strings
  const deBroglieString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/deBroglie' );

  // images
  const deBroglieButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/deBroglieButton.png' );

  class DeBroglieModel extends PredictiveModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {}, options );

      assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths'  );
      options.hasTransitionWavelengths = true;

      super( deBroglieString, deBroglieButtonImage, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );
} );