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
  var EnergyDiagram = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/EnergyDiagram' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LegendNode' );
  var LightNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LightNode' );
  var LightControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/LightControls' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModeControl' );
  var ModelControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ModelControl' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Path = require( 'SCENERY/nodes/Path' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/SpectrometerNode' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TinyBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/TinyBox' );
  var ViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ViewProperties' );
  var ZoomBoxNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ZoomBoxNode' );

  // strings
  var boxOfHydrogenString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/boxOfHydrogen' );
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
      left: modelControl.right + 20,
      top: modeControl.bottom + 50
    } );
    this.addChild( boxOfHydrogenNode );

    // Title above box of hydrogen
    var boxOfHydrogenLabelNode = new MultiLineText( boxOfHydrogenString, {
      font: new MHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      centerX: boxOfHydrogenNode.centerX,
      bottom: boxOfHydrogenNode.top - 10,

      // i18n, determined empirically
      maxWidth: 90,
      maxHeight: 35
    } );
    this.addChild( boxOfHydrogenLabelNode );

    // Tiny box that indicates what will be exploded
    var tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20
    } );
    this.addChild( tinyBoxNode );

    // Beam of light from gun
    var beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
      centerX: boxOfHydrogenNode.centerX,
      top: boxOfHydrogenNode.bottom
    } );
    this.addChild( beamNode );

    // Light
    var lightNode = new LightNode( model.light.onProperty, {
      centerX: beamNode.centerX,
      top: beamNode.bottom
    } );
    this.addChild( lightNode );

    // Light controls
    var lightControls = new LightControls(
      model.light.modeProperty, model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightNode.left,
        top: lightNode.bottom + 15
      } );
    this.addChild( lightControls );

    // Box that shows the zoomed-in view
    var zoomBoxNode = new ZoomBoxNode( {
      left: lightNode.right + 30,
      top: this.layoutBounds.top + 25
    } );
    this.addChild( zoomBoxNode );

    // Dashed lines that connect the tiny box and zoom box
    var dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( zoomBoxNode.left, zoomBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomBoxNode.left, zoomBoxNode.bottom ), {
      stroke: 'white',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    // Legend
    var legendNode = new LegendNode( {
      left: zoomBoxNode.right + 15,
      centerY: zoomBoxNode.centerY
    } );
    this.addChild( legendNode );

    // Spectrometer
    var spectrometerNode = new SpectrometerNode( viewProperties.spectrometerVisibleProperty, {
      left: lightControls.right + 10,
      bottom: lightControls.bottom
    } );
    this.addChild( spectrometerNode );

    // Energy diagram
    var energyDiagram = new EnergyDiagram( viewProperties.energyDiagramVisibleProperty, {
      left: zoomBoxNode.right + 10,
      top: zoomBoxNode.top
    } );
    this.addChild( energyDiagram );

    // Disclaimer
    var disclaimerNode = new Text( drawingsAreNotToScaleString, {
      font: new MHAFont( 14 ),
      fill: 'white',
      centerX: zoomBoxNode.centerX,
      centerY: this.layoutBounds.top + ( zoomBoxNode.top - this.layoutBounds.top ) / 2,
      maxWidth: 250 // TODO width of the big box
    } );
    this.addChild( disclaimerNode );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.right - 10,
      bottom: spectrometerNode.bottom
    } );
    this.addChild( resetAllButton );

    viewProperties.modeProperty.link( function( mode ) {
      //TODO perhaps fade this in/out
      modelControl.visible = ( mode === 'prediction' );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'ModelsOfTheHydrogenAtomScreenView', ModelsOfTheHydrogenAtomScreenView );

  return inherit( ScreenView, ModelsOfTheHydrogenAtomScreenView, {

    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );