// Copyright 2015-2016, University of Colorado Boulder

/**
 * 'Spectra' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Screen = require( 'JOIST/Screen' );
  var SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  var SpectraScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectraScreenView' );

  // strings
  var screenSpectraString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.spectra' );

  /**
   * @constructor
   */
  function SpectraScreen() {

    var options = {
      name: screenSpectraString,
      backgroundColor: 'black'
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