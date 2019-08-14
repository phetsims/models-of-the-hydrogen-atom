// Copyright 2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );

  // strings
  const bohrButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/bohrButton.png' );

  // images
  const bohrString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/bohr' );

  class BohrModel extends PredictiveModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {}, options );

      assert && assert( options.hasTransitionWavelengths === undefined, 'BohrModel sets hasTransitionWavelengths'  );
      options.hasTransitionWavelengths = true;

      super( bohrString, bohrButtonImage, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );
} );