// Copyright 2016-2017, University of Colorado Boulder

/**
 * 'Spectra' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Screen = require( 'JOIST/Screen' );
  const SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  const SpectraScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectraScreenView' );

  // strings
  const screenSpectraString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.spectra' );

  /**
   * @constructor
   */
  function SpectraScreen() {

    const options = {
      name: screenSpectraString,
      backgroundColorProperty: MOTHAColorProfile.screenBackgroundColorProperty
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new SpectraModel(); },
      function( model ) { return new SpectraScreenView( model ); },
      options
    );
  }

  modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );

  return inherit( Screen, SpectraScreen );
} );