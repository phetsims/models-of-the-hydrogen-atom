// Copyright 2015, University of Colorado Boulder

/**
 * View for 'Models of the Hydrogen Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BeamNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/BeamNode' );
  var BoxOfHydrogenNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/BoxOfHydrogenNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LegendNode' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModeControl' );
  var ModelControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModelControl' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Property = require( 'AXON/Property' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ViewProperties' );

  /**
   * @param {ModelsOfTheHydrogenAtomModel} model
   * @constructor
   */
  function ModelsOfTheHydrogenAtomScreenView( model ) {

    ScreenView.call( this );

    var viewProperties = new ViewProperties();

    // selects between 'Experiment' and 'Prediction' modes
    var modeControl = new ModeControl( viewProperties.modeProperty, {
      left: this.layoutBounds.left + 10,
      top: this.layoutBounds.top + 5
    } );
    this.addChild( modeControl );

    // selects a predictive model
    var modelControl = new ModelControl( model.modelProperty, {
      left: modeControl.left,
      top: modeControl.bottom + 5
    } );
    this.addChild( modelControl );

    // Box of hydrogen
    var boxOfHydrogenNode = new BoxOfHydrogenNode( {
      left: modelControl.right + 40,
      top: modeControl.bottom + 30
    } );
    this.addChild( boxOfHydrogenNode );

    // Beam of light from gun
    var beamVisibleProperty = new Property( true ); //TODO move to model, this is whether gun is on/off
    var beamColorProperty = new Property( 'yellow' ); //TODO move to model, this is derived from gun's wavelength
    var beamNode = new BeamNode( beamVisibleProperty, beamColorProperty, {
      centerX: boxOfHydrogenNode.centerX,
      top: boxOfHydrogenNode.bottom
    } );
    this.addChild( beamNode );

    // Legend
    var legendNode = new LegendNode( {
      right: this.layoutBounds.right - 10,
      top: this.layoutBounds.top + 10
    } );
    this.addChild( legendNode );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right:  this.layoutBounds.right - 10,
      bottom: this.layoutBounds.bottom - 10
    } );
    this.addChild( resetAllButton );

    viewProperties.modeProperty.link( function( mode ) {
      modelControl.visible = ( mode === 'prediction' );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomScreenView', ModelsOfTheHydrogenAtomScreenView );

  return inherit( ScreenView, ModelsOfTheHydrogenAtomScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );