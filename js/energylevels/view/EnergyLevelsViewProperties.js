// Copyright 2019, University of Colorado Boulder

/**
 * EnergyLevelsViewProperties defines Properties that are specific to the view in the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/MOTHAViewProperties' );

  class EnergyLevelsViewProperties extends MOTHAViewProperties {

    constructor() {

      super();

      // @public {boolean} is the Electron Energy Level accordion box expanded?
      this.electronEnergyLevelExpandedProperty = new BooleanProperty( false );
    }

    // @public
    reset() {
      super.reset();
      this.electronEnergyLevelExpandedProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsViewProperties', EnergyLevelsViewProperties );
} );
