// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BeamNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/BeamNode' );
  var BoxOfHydrogenNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/BoxOfHydrogenNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EnergyDiagram = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/EnergyDiagram' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LegendNode' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var LightModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LightModeControl' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModeControl' );
  var ModelControlPanel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModelControlPanel' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MOTHAViewProperties' );
  var MonochromaticControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MonochromaticControls' );
  var Path = require( 'SCENERY/nodes/Path' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectrometerNode' );
  var Shape = require( 'KITE/Shape' );
  var TimeControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TimeControls' );
  var TinyBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TinyBox' );
  var ZoomBoxNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ZoomBoxNode' );

  /**
   * @param {SpectraModel} model
   * @constructor
   */
  function SpectraScreenView( model ) {

    ScreenView.call( this );

    var viewProperties = new MOTHAViewProperties();

    // Legend
    var legendNode = new LegendNode( {
      left: this.layoutBounds.left + 20,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( legendNode );

    // Light mode control (radio buttons)
    var lightModeControl = new LightModeControl( model.light.modeProperty, {
      left: this.layoutBounds.left + 30,
      bottom: 415
    } );
    this.addChild( lightModeControl );

    // Controls for monochromatic light
    var monochromaticControls = new MonochromaticControls(
      model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightModeControl.left,
        top: lightModeControl.bottom + 15
      } );
    this.addChild( monochromaticControls );

    // Light
    var lightNode = new LaserPointerNode( model.light.onProperty, {
      bodySize: new Dimension2( 73, 52 ),
      nozzleSize: new Dimension2( 14, 40 ),
      buttonRadius: 15,
      rotation: -Math.PI / 2, // pointing up
      left: lightModeControl.right + 20,
      bottom: lightModeControl.bottom
    } );
    this.addChild( lightNode );

    // Beam of light
    var beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
      centerX: lightNode.centerX,
      bottom: lightNode.top + 1
    } );
    this.addChild( beamNode );

    // Box of hydrogen
    var boxOfHydrogenNode = new BoxOfHydrogenNode( {
      centerX: beamNode.centerX,
      bottom: beamNode.top + 1
    } );
    this.addChild( boxOfHydrogenNode );

    // Tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20
    } );
    this.addChild( tinyBoxNode );

    // Time controls
    var timeControls = new TimeControls( viewProperties.runningProperty, viewProperties.clockSpeedProperty, this, {
      left: monochromaticControls.left,
      top: monochromaticControls.bottom + 20
    } );
    this.addChild( timeControls );

    // selects between 'Experiment' and 'Prediction' modes
    var modeControl = new ModeControl( viewProperties.modeProperty, {
      right: this.layoutBounds.right - 20,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( modeControl );

    // selects a predictive model
    var modelControlPanel = new ModelControlPanel( model.modelProperty, {
      right: modeControl.right,
      top: modeControl.bottom + 5
    } );
    this.addChild( modelControlPanel );

    // Box that shows the zoomed-in view
    var zoomBoxNode = new ZoomBoxNode( {
      left: lightNode.right + 30,
      top: this.layoutBounds.top + 15
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

    // Spectrometer
    var spectrometerNode = new SpectrometerNode( viewProperties.spectrometerVisibleProperty, {
      left: monochromaticControls.right + 10,
      top: monochromaticControls.top
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
      right: this.layoutBounds.right - 20,
      bottom: this.layoutBounds.bottom - 20
    } );
    this.addChild( resetAllButton );

    viewProperties.modeProperty.link( function( mode ) {
      modelControlPanel.visible = ( mode === 'model' );
    } );

    // Show the energy diagram for models where it's relevant
    model.modelProperty.link( function( model ) {
      var modelsWithDiagram = [ 'classicalSolarSystem', 'bohr', 'deBroglie', 'schrodinger ' ];
      energyDiagram.visible = _.contains( modelsWithDiagram, model );
    } );

    // Visibility of monochromatic light controls
    model.light.modeProperty.link( function( mode ) {
      monochromaticControls.visible = ( mode === 'monochromatic' );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );

  return inherit( ScreenView, SpectraScreenView, {

    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );