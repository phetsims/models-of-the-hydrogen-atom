// Copyright 2015-2019, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
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

  class SpectraModel {

    constructor() {

      // @public which predictive model is being used
      this.predictiveModelProperty = new EnumerationProperty( PredictiveModels, PredictiveModels.CLASSICAL_SOLAR_SYSTEM );

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
      //TODO
    }
  }

  // @public models that include the concept of transition wavelengths
  SpectraModel.PREDICTIVE_MODELS_WITH_TRANSITION_WAVELENGTHS = [
    PredictiveModels.BOHR,
    PredictiveModels.DEBROGLIE,
    PredictiveModels.SCHRODINGER
  ];

  return modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );
} );