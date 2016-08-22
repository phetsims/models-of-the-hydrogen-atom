// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for 'Models of the Hydrogen Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BeamNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/BeamNode' );
  var BoxOfHydrogenNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/BoxOfHydrogenNode' );
  var EnergyDiagram = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/EnergyDiagram' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LegendNode' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var LightControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/LightControls' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/ModeControl' );
  var ModelControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/ModelControl' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/MOTHAViewProperties' );
  var Path = require( 'SCENERY/nodes/Path' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/SpectrometerNode' );
  var Shape = require( 'KITE/Shape' );
  var TinyBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/TinyBox' );
  var ZoomBoxNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/screen1/view/ZoomBoxNode' );

  /**
   * @param {Screen1Model} model
   * @constructor
   */
  function Screen1View( model ) {

    ScreenView.call( this );

    var viewProperties = new MOTHAViewProperties();

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

    // Tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20
    } );
    this.addChild( tinyBoxNode );

    // Beam of light
    var beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
      centerX: boxOfHydrogenNode.centerX,
      top: boxOfHydrogenNode.bottom
    } );
    this.addChild( beamNode );

    // Light
    var lightNode = new LaserPointerNode( model.light.onProperty, {
      rotation: -Math.PI / 2, // pointing up
      centerX: beamNode.centerX,
      top: beamNode.bottom
    } );
    this.addChild( lightNode );

    // Box that shows the zoomed-in view
    var zoomBoxNode = new ZoomBoxNode( {
      left: lightNode.right + 30,
      top: this.layoutBounds.top + 25
    } );
    this.addChild( zoomBoxNode );

    // Light controls
    var lightControls = new LightControls(
      model.light.modeProperty, model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightNode.left,
        top: zoomBoxNode.bottom + 10
      } );
    this.addChild( lightControls );

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
      top: lightControls.top
    } );
    this.addChild( spectrometerNode );

    // Energy diagram
    var energyDiagram = new EnergyDiagram( viewProperties.energyDiagramVisibleProperty, {
      left: zoomBoxNode.right + 10,
      top: zoomBoxNode.top
    } );
    this.addChild( energyDiagram );

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

    // Show the energy diagram for models where it's relevant
    model.modelProperty.link( function( model ) {
      var modelsWithDiagram = [ 'classicalSolarSystem', 'bohr', 'deBroglie', 'schrodinger '];
      energyDiagram.visible = ( _.indexOf( modelsWithDiagram, model ) !== -1 );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'Screen1View', Screen1View );

  return inherit( ScreenView, Screen1View, {

    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );