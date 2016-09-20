// Copyright 2016, University of Colorado Boulder

/**
 * 'Energy Levels' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAColors = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColors' );
  var Screen = require( 'JOIST/Screen' );
  var EnergyLevelsModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/model/EnergyLevelsModel' );
  var EnergyLevelsScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsScreenView' );

  // strings
  var screenEnergyLevelsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.energyLevels' );

  /**
   * @constructor
   */
  function EnergyLevelsScreen() {

    var options = {
      name: screenEnergyLevelsString,
      backgroundColor: MOTHAColors.SCREEN_BACKGROUND_COLOR
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new EnergyLevelsModel(); },
      function( model ) { return new EnergyLevelsScreenView( model ); },
      options
    );
  }

  modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );

  return inherit( Screen, EnergyLevelsScreen );
} );