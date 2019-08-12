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
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModels = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModels' );

  class EnergyLevelsModel {

    constructor() {

      // @public which predictive model is being used
      this.predictiveModelProperty = new EnumerationProperty( PredictiveModels, PredictiveModels.CLASSICAL_SOLAR_SYSTEM, {

        //TODO how to specify a subset of an Enumeration?
        // These are models that have an Energy diagram.
        // validValues: [
        //   PredictiveModels.CLASSICAL_SOLAR_SYSTEM,
        //   PredictiveModels.BOHR,
        //   PredictiveModels.DEBROGLIE,
        //   PredictiveModels.SCHRODINGER
        // ]
      } );

      // @public
      this.light = new Light();
    }

    /**
     * @public
     */
    reset() {
      this.predictiveModelProperty.reset();
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