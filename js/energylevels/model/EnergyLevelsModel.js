// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const StringProperty = require( 'AXON/StringProperty' );

  class EnergyLevelsModel {

    constructor() {

      // @public name of the predictive model being used
      this.modelNameProperty = new StringProperty( 'classicalSolarSystem', {

        // These are models that have an Energy diagram.
        validValues: [
          'classicalSolarSystem',
          'bohr',
          'deBroglie',
          'schrodinger'
        ]
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