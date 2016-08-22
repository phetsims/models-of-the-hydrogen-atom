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
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screenSpectraString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.spectra' );

  /**
   * @constructor
   */
  function SpectraScreen() {

    Screen.call( this,
      screenSpectraString,
      new ScreenIcon( new Text( '' ), { fill: 'lightGreen' } ), //TODO icon
      function() { return new SpectraModel(); },
      function( model ) { return new SpectraScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );

  return inherit( Screen, SpectraScreen );
} );