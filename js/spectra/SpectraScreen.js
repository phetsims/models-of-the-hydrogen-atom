// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'Spectra' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/MOTHAScreen' );
  const SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  const SpectraScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectraScreenView' );

  // strings
  const screenSpectraString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.spectra' );

  class SpectraScreen extends MOTHAScreen {

    constructor() {

      const options = {
        name: screenSpectraString
        //TODO add homeScreenIcon
      };

      super(
        () => new SpectraModel(),
        model => new SpectraScreenView( model ),
        options
      );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );
} );