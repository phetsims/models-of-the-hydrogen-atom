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

  /**
   * @constructor
   */
  function ModelsOfTheHydrogenAtomModel() {

    PropertySet.call( this, {} );
  }

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomModel', ModelsOfTheHydrogenAtomModel );

  return inherit( PropertySet, ModelsOfTheHydrogenAtomModel, {

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );