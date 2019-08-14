// Copyright 2015-2019, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
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
  const ModelModeSwitch = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ModelModeSwitch' );
  const ModelModes = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ModelModes' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MonochromaticControls = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MonochromaticControls' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const MOTHAConstants = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAConstants' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PredictiveModelPanel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/PredictiveModelPanel' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Shape = require( 'KITE/Shape' );
  const SnapshotsDialog = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SnapshotsDialog' );
  const SpectraViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectraViewProperties' );
  const SpectrometerAccordionBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SpectrometerAccordionBox' );
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

      const viewProperties = new SpectraViewProperties();

      // Legend
      const legendNode = new LegendNode( {
        left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
        top: this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN
      } );

      // Light mode control (radio buttons)
      const lightModeControl = new LightModeControl( model.light.monochromaticEnabledProperty, {
        left: this.layoutBounds.left + 30,
        bottom: 415
      } );

      // Controls for monochromatic light
      const monochromaticControls = new MonochromaticControls( viewProperties.modelModeProperty, model.predictiveModelProperty,
        model.light.wavelengthProperty, viewProperties.absorptionWavelengthsVisibleProperty, {
          left: lightModeControl.left,
          top: lightModeControl.bottom + 15
        } );

      // Light
      const lightNode = new LaserPointerNode( model.light.onProperty, {
        bodySize: new Dimension2( 88, 64 ),
        nozzleSize: new Dimension2( 18, 50 ),
        buttonRadius: 19,
        rotation: -Math.PI / 2, // pointing up
        left: lightModeControl.right + 20,
        bottom: lightModeControl.bottom
      } );

      // Beam of light
      const beamNode = new BeamNode( model.light.onProperty, model.light.colorProperty, {
        beamSize: new Dimension2( 30, 66 ),
        centerX: lightNode.centerX,
        bottom: lightNode.top + 1
      } );

      // Box of hydrogen
      const boxOfHydrogenNode = new BoxOfHydrogenNode( {
        centerX: beamNode.centerX,
        bottom: beamNode.top + 1
      } );

      // Tiny box that indicates what will be zoomed
      const tinyBoxNode = new TinyBox( {
        right: boxOfHydrogenNode.right - 10,
        top: boxOfHydrogenNode.top + 20
      } );

      // Time controls
      const timeControls = new TimeControls( viewProperties.runningProperty, viewProperties.clockSpeedProperty, this, {
        left: monochromaticControls.left,
        top: monochromaticControls.bottom + 20
      } );

      // Box that shows the zoomed-in view
      const zoomBoxNode = new ZoomBoxNode( {
        left: lightNode.right + 50,
        top: this.layoutBounds.top + 15
      } );

      // Dashed lines that connect the tiny box and zoom box
      const dashedLines = new Path( new Shape()
        .moveTo( tinyBoxNode.left, tinyBoxNode.top )
        .lineTo( zoomBoxNode.left, zoomBoxNode.top )
        .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
        .lineTo( zoomBoxNode.left, zoomBoxNode.bottom ), {
        stroke: MOTHAColorProfile.boxStrokeProperty,
        lineDash: [ 5, 5 ]
      } );

      // switches between EXPERIMENT and PREDICTION model modes
      const modelModeSwitch = new ModelModeSwitch( viewProperties.modelModeProperty );

      // panel that contains radio buttons for selecting a predictive model
      const predictiveModelPanel = new PredictiveModelPanel( model.predictiveModelProperty );

      const modelVBox = new VBox( {
        children: [ modelModeSwitch, predictiveModelPanel ],
        align: 'center',
        spacing: 10,
        left: zoomBoxNode.right + 30,
        top: zoomBoxNode.top
      } );

      // Spectrometer
      const spectrometerAccordionBox = new SpectrometerAccordionBox(
        viewProperties.spectrometerExpandedProperty, viewProperties.numberOfSnapshotsProperty, {
          left: monochromaticControls.right + 10,
          top: monochromaticControls.top
        } );

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
        right: spectrometerAccordionBox.right,
        bottom: spectrometerAccordionBox.top - 10
      } );

      // Reset All button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
          viewProperties.reset();
        },
        right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN
      } );

      // rendering order
      this.addChild( legendNode );
      this.addChild( lightModeControl );
      this.addChild( monochromaticControls );
      this.addChild( boxOfHydrogenNode );
      this.addChild( tinyBoxNode );
      this.addChild( timeControls );
      this.addChild( zoomBoxNode );
      this.addChild( dashedLines );
      this.addChild( beamNode );
      this.addChild( lightNode );
      this.addChild( modelVBox );
      this.addChild( spectrometerAccordionBox );
      this.addChild( viewSnapshotsButton );
      this.addChild( resetAllButton );

      viewProperties.modelModeProperty.link( modelMode => {
        predictiveModelPanel.visible = ( modelMode === ModelModes.PREDICTION );
      } );

      // Visibility of monochromatic light controls
      model.light.monochromaticEnabledProperty.link( monochromaticEnabled => {
        monochromaticControls.visible = monochromaticEnabled;
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