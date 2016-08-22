// Copyright 2015-2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Screen1 = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/Screen1' );
  var Screen2 = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen2/Screen2' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  var simOptions = {
    credits: {
      //TODO update credits for JS version
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Mindy Gratny,\nDanielle Harlow, Ariel Paul, Kathy Perkins, Noah Podolefsky, Carl Weiman',
      qualityAssurance: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( modelsOfTheHydrogenAtomTitleString, [ new Screen1(), new Screen2() ], simOptions );
    sim.start();
  } );
} );