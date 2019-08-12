// Copyright 2015-2019, University of Colorado Boulder

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

  // predictive models supported by this screen
  const SUPPORTED_PREDICTIVE_MODELS = [
    PredictiveModels.CLASSICAL_SOLAR_SYSTEM,
    PredictiveModels.BOHR,
    PredictiveModels.DEBROGLIE,
    PredictiveModels.SCHRODINGER
  ];

  class EnergyLevelsModel {

    constructor() {

      // @public which predictive model is being used
      this.predictiveModelProperty = new EnumerationProperty( PredictiveModels, PredictiveModels.CLASSICAL_SOLAR_SYSTEM );

      //TODO should EnumerationProperty validation support this?
      // This screen supports a subset of models, so verify that the model is supported by this screen.
      this.predictiveModelProperty.link( predictiveModel => {
        assert && assert( _.includes( SUPPORTED_PREDICTIVE_MODELS, predictiveModel ),
          `unsupported predictiveModel: ${predictiveModel}` );
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