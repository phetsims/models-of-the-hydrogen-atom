// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function EnergyLevelsModel() {

    // @public {string} name of the predictive model being used
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

  modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );

  return inherit( Object, EnergyLevelsModel, {

    // @public @override
    reset: function() {
      this.modelNameProperty.reset();
      this.light.reset();
    },

    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );