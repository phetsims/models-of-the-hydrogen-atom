// Copyright 2016-2017, University of Colorado Boulder

/**
 * 'Energy Levels' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const EnergyLevelsModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/model/EnergyLevelsModel' );
  const EnergyLevelsScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsScreenView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenEnergyLevelsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.energyLevels' );

  /**
   * @constructor
   */
  function EnergyLevelsScreen() {

    const options = {
      name: screenEnergyLevelsString,
      backgroundColorProperty: MOTHAColorProfile.screenBackgroundColorProperty
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