// Copyright 2015, University of Colorado Boulder

/**
 * 'Models of the Hydrogen Atom' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var MOTHAModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/model/MOTHAModel' );
  var MOTHAScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MOTHAScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  // strings
  var modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  /**
   * @constructor
   */
  function MOTHAScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, modelsOfTheHydrogenAtomTitleString, icon,
      function() { return new MOTHAModel(); },
      function( model ) { return new MOTHAScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );

  return inherit( Screen, MOTHAScreen );
} );