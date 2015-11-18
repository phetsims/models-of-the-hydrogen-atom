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
  var LightNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LightNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LegendNode' );
  var LightControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LightControls' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModeControl' );
  var ModelControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModelControl' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/SpectrometerNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ViewProperties' );

  // strings
  var drawingsAreNotToScaleString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/drawingsAreNotToScale' );

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
      top: modeControl.bottom + 5
    } );
    this.addChild( boxOfHydrogenNode );

    // Beam of light from gun
    var beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
      centerX: boxOfHydrogenNode.centerX,
      top: boxOfHydrogenNode.bottom
    } );
    this.addChild( beamNode );

    // Light
    var lightNode = new LightNode( model.light.onProperty, {
      x: beamNode.centerX,
      y: beamNode.bottom
    } );
    this.addChild( lightNode );

    // Light controls
    var lightControls = new LightControls(
      model.light.modeProperty, model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightNode.left,
        top: lightNode.bottom
    } );
    this.addChild( lightControls );

    // Spectrometer
    var spectrometerNode = new SpectrometerNode( viewProperties.spectrometerVisibleProperty, {
      left: lightControls.right + 20,
      bottom: lightControls.bottom
    } );
    this.addChild( spectrometerNode );

    // Legend
    var legendNode = new LegendNode( {
      right: this.layoutBounds.right - 10,
      top: this.layoutBounds.top + 10
    } );
    this.addChild( legendNode );

    // Disclaimer
    var disclaimerNode = new Text( drawingsAreNotToScaleString, {
      font: new MHAFont( 14 ),
      fill: 'white',
      centerX: this.layoutBounds.centerX, //TODO center over big box
      top: this.layoutBounds.top + 10,
      maxWidth: 250 // TODO width of the big box
    } );
    this.addChild( disclaimerNode );

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
      //TODO perhaps fade this in/out
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