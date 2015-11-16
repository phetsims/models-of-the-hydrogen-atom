// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ModeSwitch = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModeSwitch' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var ViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ViewProperties' );

  /**
   * @param {ModelsOfTheHydrogenAtomModel} modelsOfTheHydrogenAtomModel
   * @constructor
   */
  function ModelsOfTheHydrogenAtomScreenView( modelsOfTheHydrogenAtomModel ) {

    ScreenView.call( this );

    var viewProperties = new ViewProperties();

    var modeSwitch = new ModeSwitch( viewProperties.modeProperty, {
      left: this.layoutBounds.left + 20,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( modeSwitch );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        modelsOfTheHydrogenAtomModel.reset();
        viewProperties.reset();
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