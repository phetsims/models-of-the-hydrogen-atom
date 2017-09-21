// Copyright 2015-2017, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LegendNode' );
  var LightModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LightModeControl' );
  var ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModeControl' );
  var ModelControlPanel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModelControlPanel' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MonochromaticControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MonochromaticControls' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MOTHAViewProperties' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var SnapshotsDialog = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SnapshotsDialog' );
  var SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectrometerNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimeControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TimeControls' );
  var TinyBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TinyBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ZoomBoxNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ZoomBoxNode' );

  // strings
  var viewSnapshotsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/viewSnapshots' );

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
    var monochromaticControls = new MonochromaticControls( viewProperties.modeProperty, model.modelNameProperty,
      model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightModeControl.left,
        top: lightModeControl.bottom + 15
      } );
    this.addChild( monochromaticControls );

    // Light
    var lightNode = new LaserPointerNode( model.light.onProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonRadius: 19,
      rotation: -Math.PI / 2, // pointing up
      left: lightModeControl.right + 20,
      bottom: lightModeControl.bottom
    } );
    this.addChild( lightNode );

    // Beam of light
    var beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
      beamSize: new Dimension2( 30, 66 ),
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

    // Box that shows the zoomed-in view
    var zoomBoxNode = new ZoomBoxNode( {
      left: lightNode.right + 50,
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

    // selects between 'Experiment' and 'Model' modes
    var modeControl = new ModeControl( viewProperties.modeProperty );

    // selects a predictive model
    var modelControlPanel = new ModelControlPanel( model.modelNameProperty );

    this.addChild( new VBox( {
      children: [ modeControl, modelControlPanel ],
      align: 'center',
      spacing: 10,
      left: zoomBoxNode.right + 30,
      top: zoomBoxNode.top
    } ) );

    // Spectrometer
    var spectrometerNode = new SpectrometerNode(
      viewProperties.spectrometerExpandedProperty, viewProperties.numberOfSnapshotsProperty, {
        left: monochromaticControls.right + 10,
        top: monochromaticControls.top
      } );
    this.addChild( spectrometerNode );

    // reused and constructed lazily because Dialog requires sim bounds during construction
    var dialog = null;

    // View Snapshots button, above upper-right corner of spectrometer
    var viewSnapshotsButton = new RectangularPushButton( {
      content: new Text( viewSnapshotsString, { font: new MOTHAFont( 16 ) } ),
      listener: function() {
        if ( !dialog ) {
          dialog = new SnapshotsDialog( viewProperties.numberOfSnapshotsProperty );
        }
        dialog.show();
      },
      right: spectrometerNode.right,
      bottom: spectrometerNode.top - 10
    } );
    this.addChild( viewSnapshotsButton );

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

    // Visibility of monochromatic light controls
    model.light.modeProperty.link( function( mode ) {
      monochromaticControls.visible = ( mode === 'monochromatic' );
    } );

    // Show 'View snapshots' button when there are snapshots available
    viewProperties.numberOfSnapshotsProperty.link( function( numberOfSnapshots ) {
      viewSnapshotsButton.visible = ( numberOfSnapshots > 0 );
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