// Copyright 2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ModelsOfTheHydrogenAtomScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/ModelsOfTheHydrogenAtomScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  var simOptions = {
    credits: {
      //TODO update credits for JS version
      leadDesign: 'Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Mike Dubson, Noah Finkelstein, Mindy Gratny,\nDanielle Harlow, Kathy Perkins, Noah Podolefsky, Carl Weiman',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( modelsOfTheHydrogenAtomTitleString, [ new ModelsOfTheHydrogenAtomScreen() ], simOptions );
    sim.start();
  } );
} );