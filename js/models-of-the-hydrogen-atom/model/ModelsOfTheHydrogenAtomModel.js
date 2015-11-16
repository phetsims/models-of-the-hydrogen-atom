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
  var PropertySet = require( 'AXON/PropertySet' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

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

    PropertySet.call( this, {
      model: MODEL_VALUES[ 0 ] // {string} see MODEL_VALUES
    } );

    this.modelProperty.link( function( model ) {
      assert && assert( _.indexOf( MODEL_VALUES, model ) !== -1 );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomModel', ModelsOfTheHydrogenAtomModel );

  return inherit( PropertySet, ModelsOfTheHydrogenAtomModel, {

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );