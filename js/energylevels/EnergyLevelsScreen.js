// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'Energy Levels' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyLevelsModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/model/EnergyLevelsModel' );
  const EnergyLevelsScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsScreenView' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenEnergyLevelsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.energyLevels' );

  class EnergyLevelsScreen extends Screen {

    constructor() {

      const options = {
        name: screenEnergyLevelsString,
        backgroundColorProperty: MOTHAColorProfile.screenBackgroundColorProperty
        //TODO add homeScreenIcon
      };

      super(
        () => new EnergyLevelsModel(),
        model => new EnergyLevelsScreenView( model ),
        options
      );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );
} );