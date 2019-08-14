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
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );

  // strings
  const plumPuddingString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/plumPudding' );

  // images
  const plumPuddingButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/plumPuddingButton.png' );

  class PlumPuddingModel extends PredictiveModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      super( plumPuddingString, plumPuddingButtonImage, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
} );