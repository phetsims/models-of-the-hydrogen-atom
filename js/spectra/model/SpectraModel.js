// Copyright 2015-2019, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/MOTHAModel' );
  const PredictiveModels = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModels' );

  class SpectraModel extends MOTHAModel {

    constructor() {
      super( PredictiveModels.CLASSICAL_SOLAR_SYSTEM );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );
} );