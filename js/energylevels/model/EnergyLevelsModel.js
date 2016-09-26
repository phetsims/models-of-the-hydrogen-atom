// Copyright 2016, University of Colorado Boulder

/**
 * Model for 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function EnergyLevelsModel() {

    // @public {string} name of the predictive model being used
    this.modelNameProperty = new Property( 'classicalSolarSystem', {

      // These are models that have an Energy diagram.
      allowedValues: [
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