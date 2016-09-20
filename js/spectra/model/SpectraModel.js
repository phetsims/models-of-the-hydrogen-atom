// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for 'Spectra' screen.
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

  // valid values for the 'model' property
  var MODEL_VALUES = [
    'billiardBall',
    'plumPudding',
    'classicalSolarSystem',
    'bohr',
    'deBroglie',
    'schrodinger'
  ];

  var MODELS_WITH_TRANSITION_WAVELENGTHS = [
    'bohr',
    'deBroglie',
    'schrodinger'
  ];
  //TODO assert that MODELS_WITH_TRANSITION_WAVELENGTHS is a subset of MODEL_VALUES

  /**
   * @constructor
   */
  function SpectraModel() {

    // @public
    PropertySet.call( this, {
      model: MODEL_VALUES[ 0 ] // {string} the predictive model being used, see MODEL_VALUES
    } );

    // @public
    this.light = new Light();

    // validate model Property
    this.modelProperty.link( function( model ) {
      assert && assert( _.indexOf( MODEL_VALUES, model ) !== -1 );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );

  return inherit( PropertySet, SpectraModel, {

    // @public @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.light.reset();
    },

    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  }, {

    MODELS_WITH_TRANSITION_WAVELENGTHS: MODELS_WITH_TRANSITION_WAVELENGTHS
  } );
} );