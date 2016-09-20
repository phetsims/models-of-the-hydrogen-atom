// Copyright 2016, University of Colorado Boulder

/**
 * Colors used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  var MOTHAColors = {
    SCREEN_BACKGROUND_COLOR: 'black',
    TITLE_FILL: 'rgb( 235, 235, 0 )', // yellow
    SELECTED_COLOR: 'rgb( 235, 235, 0 )', // yellow
    DESELECTED_COLOR: 'rgb( 200, 200, 200 )', // gray
    UV_COLOR: new Color( 160, 160, 160 ), // gray
    IR_COLOR: new Color( 160, 160, 160 ) // gray
  };

  modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );

  return MOTHAColors;
} );
