// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'Spectra' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Screen = require( 'JOIST/Screen' );
  const SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  const SpectraScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectraScreenView' );

  // strings
  const screenSpectraString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.spectra' );

  class SpectraScreen extends Screen {

    constructor() {

      const options = {
        name: screenSpectraString,
        backgroundColorProperty: MOTHAColorProfile.screenBackgroundColorProperty
        //TODO add homeScreenIcon
      };

      super(
        function() { return new SpectraModel(); },
        function( model ) { return new SpectraScreenView( model ); },
        options
      );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );
} );