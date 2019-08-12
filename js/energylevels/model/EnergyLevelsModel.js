// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const ModelNames = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ModelNames' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  class EnergyLevelsModel {

    constructor() {

      // @public name of the predictive model being used
      this.modelNameProperty = new EnumerationProperty( ModelNames, ModelNames.CLASSICAL_SOLAR_SYSTEM, {

        //TODO how to specify a subset of an Enumeration?
        // These are models that have an Energy diagram.
        // validValues: [
        //   ModelNames.CLASSICAL_SOLAR_SYSTEM,
        //   ModelNames.BOHR,
        //   ModelNames.DEBROGLIE,
        //   ModelNames.SCHRODINGER
        // ]
      } );

      // @public
      this.light = new Light();
    }

    /**
     * @public
     */
    reset() {
      this.modelNameProperty.reset();
      this.light.reset();
    }

    /**
     * @param {number} dt
     * @public
     */
    step( dt ) {
      //TODO Handle model animation here.
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );
} );