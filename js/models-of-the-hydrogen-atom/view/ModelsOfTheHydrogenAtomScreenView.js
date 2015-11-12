// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  /**
   * @param {ModelsOfTheHydrogenAtomModel} modelsOfTheHydrogenAtomModel
   * @constructor
   */
  function ModelsOfTheHydrogenAtomScreenView( modelsOfTheHydrogenAtomModel ) {

    ScreenView.call( this );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        modelsOfTheHydrogenAtomModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomScreenView', ModelsOfTheHydrogenAtomScreenView );

  return inherit( ScreenView, ModelsOfTheHydrogenAtomScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );