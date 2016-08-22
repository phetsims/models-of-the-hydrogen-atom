// Copyright 2016, University of Colorado Boulder

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
  var Screen2Model = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen2/model/Screen2Model' );
  var Screen2View = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen2/view/Screen2View' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screen2String = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.2' );

  /**
   * @constructor
   */
  function Screen2() {

    Screen.call( this,
      screen2String,
      new ScreenIcon( new Text( '2' ), { fill: 'white' } ),
      function() { return new Screen2Model(); },
      function( model ) { return new Screen2View( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Screen2', Screen2 );

  return inherit( Screen, Screen2 );
} );