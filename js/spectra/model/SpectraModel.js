// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the 'Spectra' screen.
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

  class SpectraModel {

    constructor() {

      // @public name of the predictive model being used
      this.modelNameProperty = new EnumerationProperty( ModelNames, ModelNames.CLASSICAL_SOLAR_SYSTEM );

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
      //TODO
    }
  }

  // @public models that include the concept of transition wavelengths
  SpectraModel.MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS = [
    ModelNames.BOHR,
    ModelNames.DEBROGLIE,
    ModelNames.SCHRODINGER
  ];

  return modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );
} );