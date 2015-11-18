// Copyright 2015, University of Colorado Boulder

/**
 * Model for 'Models of the Hydrogen Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/model/Light' );
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

  /**
   * @constructor
   */
  function ModelsOfTheHydrogenAtomModel() {

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

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomModel', ModelsOfTheHydrogenAtomModel );

  return inherit( PropertySet, ModelsOfTheHydrogenAtomModel, {

    // @public @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.light.reset();
    },

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );