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
  var PropertySet = require( 'AXON/PropertySet' );

  // valid values for the 'model' property. These are models that have an Energy diagram.
  var MODEL_NAMES = [
    'classicalSolarSystem',
    'bohr',
    'deBroglie',
    'schrodinger'
  ];

  /**
   * @constructor
   */
  function EnergyLevelsModel() {

    // @public
    PropertySet.call( this, {
      modelName: MODEL_NAMES[ 0 ] // {string} the predictive model being used, see MODEL_NAMES
    } );

    // @public
    this.light = new Light();

    // validate model Property
    this.modelNameProperty.link( function( modelName ) {
      assert && assert( _.indexOf( MODEL_NAMES, modelName ) !== -1 );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );

  return inherit( PropertySet, EnergyLevelsModel, {

    // @public @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.light.reset();
    },

    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );