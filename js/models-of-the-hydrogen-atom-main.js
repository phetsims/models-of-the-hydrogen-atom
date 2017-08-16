// Copyright 2015-2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyLevelsScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/EnergyLevelsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SpectraScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/SpectraScreen' );

  // strings
  var modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  var simOptions = {
    credits: {
      //TODO update credits for JS version
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Mindy Gratny, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
            'Noah Podolefsky, Carl Weiman',
      qualityAssurance: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( modelsOfTheHydrogenAtomTitleString, [ new SpectraScreen(), new EnergyLevelsScreen() ], simOptions );
    sim.start();
  } );
} );