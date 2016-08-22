// Copyright 2015-2016, University of Colorado Boulder

/**
 * 'Models of the Hydrogen Atom' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Screen1Model = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/model/Screen1Model' );
  var Screen1View = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/Screen1View' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  // strings
  var modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  /**
   * @constructor
   */
  function Screen1() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, modelsOfTheHydrogenAtomTitleString, icon,
      function() { return new Screen1Model(); },
      function( model ) { return new Screen1View( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Screen1', Screen1 );

  return inherit( Screen, Screen1 );
} );