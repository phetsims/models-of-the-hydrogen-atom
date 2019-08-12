// Copyright 2015-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyLevelsScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/EnergyLevelsScreen' );
  const MOTHAOptionsNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/MOTHAOptionsNode' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SpectraScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/SpectraScreen' );

  // strings
  const modelsOfTheHydrogenAtomTitleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom.title' );

  const simOptions = {

    // Creates content for the Options dialog, accessible via the PhET menu
    createOptionsDialogContent: tandem => new MOTHAOptionsNode( {
      tandem: tandem
    } ),

    credits: {
      //TODO update credits for JS version
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Mindy Gratny, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
            'Noah Podolefsky, Carl Weiman',
      qualityAssurance: ''
    }
  };

  SimLauncher.launch( () => {
    const sim = new Sim( modelsOfTheHydrogenAtomTitleString, [ new SpectraScreen(), new EnergyLevelsScreen() ], simOptions );
    sim.start();
  } );
} );