// Copyright 2015-2019, University of Colorado Boulder

/**
 * View for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BeamNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/BeamNode' );
  const BoxOfHydrogenNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/BoxOfHydrogenNode' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  const LegendNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LegendNode' );
  const LightModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/LightModeControl' );
  const ModeControl = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModeControl' );
  const ModelControlPanel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModelControlPanel' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MonochromaticControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MonochromaticControls' );
  const MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MOTHAViewProperties' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Shape = require( 'KITE/Shape' );
  const SnapshotsDialog = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SnapshotsDialog' );
  const SpectrometerNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectrometerNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TimeControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TimeControls' );
  const TinyBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/TinyBox' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const ZoomBoxNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ZoomBoxNode' );

  // strings
  const viewSnapshotsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/viewSnapshots' );

  class SpectraScreenView extends ScreenView {

    /**
     * @param {SpectraModel} model
     */
    constructor( model ) {

      super();

      const viewProperties = new MOTHAViewProperties();

      // Legend
      const legendNode = new LegendNode( {
        left: this.layoutBounds.left + 20,
        top: this.layoutBounds.top + 20
      } );
      this.addChild( legendNode );

      // Light mode control (radio buttons)
      const lightModeControl = new LightModeControl( model.light.modeProperty, {
        left: this.layoutBounds.left + 30,
        bottom: 415
      } );
      this.addChild( lightModeControl );

      // Controls for monochromatic light
      const monochromaticControls = new MonochromaticControls( viewProperties.modeProperty, model.modelNameProperty,
        model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
          left: lightModeControl.left,
          top: lightModeControl.bottom + 15
        } );
      this.addChild( monochromaticControls );

      // Light
      const lightNode = new LaserPointerNode( model.light.onProperty, {
        bodySize: new Dimension2( 88, 64 ),
        nozzleSize: new Dimension2( 18, 50 ),
        buttonRadius: 19,
        rotation: -Math.PI / 2, // pointing up
        left: lightModeControl.right + 20,
        bottom: lightModeControl.bottom
      } );
      this.addChild( lightNode );

      // Beam of light
      const beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
        beamSize: new Dimension2( 30, 66 ),
        centerX: lightNode.centerX,
        bottom: lightNode.top + 1
      } );
      this.addChild( beamNode );

      // Box of hydrogen
      const boxOfHydrogenNode = new BoxOfHydrogenNode( {
        centerX: beamNode.centerX,
        bottom: beamNode.top + 1
      } );
      this.addChild( boxOfHydrogenNode );

      // Tiny box that indicates what will be zoomed
      const tinyBoxNode = new TinyBox( {
        right: boxOfHydrogenNode.right - 10,
        top: boxOfHydrogenNode.top + 20
      } );
      this.addChild( tinyBoxNode );

      // Time controls
      const timeControls = new TimeControls( viewProperties.runningProperty, viewProperties.clockSpeedProperty, this, {
        left: monochromaticControls.left,
        top: monochromaticControls.bottom + 20
      } );
      this.addChild( timeControls );

      // Box that shows the zoomed-in view
      const zoomBoxNode = new ZoomBoxNode( {
        left: lightNode.right + 50,
        top: this.layoutBounds.top + 15
      } );
      this.addChild( zoomBoxNode );

      // Dashed lines that connect the tiny box and zoom box
      const dashedLines = new Path( new Shape()
        .moveTo( tinyBoxNode.left, tinyBoxNode.top )
        .lineTo( zoomBoxNode.left, zoomBoxNode.top )
        .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
        .lineTo( zoomBoxNode.left, zoomBoxNode.bottom ), {
        stroke: 'white',
        lineDash: [ 5, 5 ]
      } );
      this.addChild( dashedLines );

      // selects between 'Experiment' and 'Model' modes
      const modeControl = new ModeControl( viewProperties.modeProperty );

      // selects a predictive model
      const modelControlPanel = new ModelControlPanel( model.modelNameProperty );

      this.addChild( new VBox( {
        children: [ modeControl, modelControlPanel ],
        align: 'center',
        spacing: 10,
        left: zoomBoxNode.right + 30,
        top: zoomBoxNode.top
      } ) );

      // Spectrometer
      const spectrometerNode = new SpectrometerNode(
        viewProperties.spectrometerExpandedProperty, viewProperties.numberOfSnapshotsProperty, {
          left: monochromaticControls.right + 10,
          top: monochromaticControls.top
        } );
      this.addChild( spectrometerNode );

      // reused and constructed lazily because Dialog requires sim bounds during construction
      let dialog = null;

      // View Snapshots button, above upper-right corner of spectrometer
      const viewSnapshotsButton = new RectangularPushButton( {
        content: new Text( viewSnapshotsString, { font: new PhetFont( 16 ) } ),
        listener: () => {
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
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
          viewProperties.reset();
        },
        right: this.layoutBounds.right - 20,
        bottom: this.layoutBounds.bottom - 20
      } );
      this.addChild( resetAllButton );

      viewProperties.modeProperty.link( mode => {
        modelControlPanel.visible = ( mode === 'model' );
      } );

      // Visibility of monochromatic light controls
      model.light.modeProperty.link( mode => {
        monochromaticControls.visible = ( mode === 'monochromatic' );
      } );

      // Show 'View snapshots' button when there are snapshots available
      viewProperties.numberOfSnapshotsProperty.link( numberOfSnapshots => {
        viewSnapshotsButton.visible = ( numberOfSnapshots > 0 );
      } );
    }

    /**
     * @param {number} dt
     * @public
     */
    step( dt ) {
      //TODO Handle view animation here.
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );
} );