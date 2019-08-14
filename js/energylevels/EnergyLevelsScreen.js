// Copyright 2016-2019, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyLevelsModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/model/EnergyLevelsModel' );
  const EnergyLevelsScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsScreenView' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAScreen = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/MOTHAScreen' );

  // strings
  const screenEnergyLevelsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.energyLevels' );

  class EnergyLevelsScreen extends MOTHAScreen {

    constructor() {

      const options = {
        name: screenEnergyLevelsString
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