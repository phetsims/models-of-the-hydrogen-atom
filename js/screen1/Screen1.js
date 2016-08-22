// Copyright 2015-2016, University of Colorado Boulder

/**
 * 'TODO' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Screen = require( 'JOIST/Screen' );
  var Screen1Model = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/model/Screen1Model' );
  var Screen1View = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/Screen1View' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screen1String = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.1' );

  /**
   * @constructor
   */
  function Screen1() {

    Screen.call( this,
      screen1String,
      new ScreenIcon( new Text( '1' ), { fill: 'white' } ),
      function() { return new Screen1Model(); },
      function( model ) { return new Screen1View( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Screen1', Screen1 );

  return inherit( Screen, Screen1 );
} );