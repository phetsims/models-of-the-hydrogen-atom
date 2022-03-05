// Copyright 2015-2022, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Path } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import BeamNode from '../../common/view/BeamNode.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentPredictionSwitch from '../../common/view/ExperimentPredictionSwitch.js';
import LegendNode from '../../common/view/LegendNode.js';
import LightModeRadioButtonGroup from '../../common/view/LightModeRadioButtonGroup.js';
import MonochromaticControls from '../../common/view/MonochromaticControls.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import PredictiveModelPanel from '../../common/view/PredictiveModelPanel.js';
import SnapshotsDialog from '../../common/view/SnapshotsDialog.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import ZoomBoxNode from '../../common/view/ZoomBoxNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import SpectraViewProperties from './SpectraViewProperties.js';

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

    // Light Mode radio button group
    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( model.light.monochromaticEnabledProperty, {
      left: this.layoutBounds.left + 30,
      bottom: 415
    } );

    // Controls for monochromatic light
    const monochromaticControls = new MonochromaticControls(
      viewProperties.experimentEnabledProperty,
      model.predictiveModelProperty,
      model.light.wavelengthProperty,
      viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightModeRadioButtonGroup.left,
        top: lightModeRadioButtonGroup.bottom + 15
      } );

    // Light
    const lightNode = new LaserPointerNode( model.light.onProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonRadius: 19,
      rotation: -Math.PI / 2, // pointing up
      left: lightModeRadioButtonGroup.right + 20,
      bottom: lightModeRadioButtonGroup.bottom
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
    const timeControlNode = new MOTHATimeControlNode( viewProperties.runningProperty, viewProperties.timeSpeedProperty, {
      left: monochromaticControls.left,
      top: monochromaticControls.bottom + 8
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
      stroke: MOTHAColors.boxStrokeProperty,
      lineDash: [ 5, 5 ]
    } );

    // switches between Experiment and Prediction
    const experimentPredictionSwitch = new ExperimentPredictionSwitch( viewProperties.experimentEnabledProperty );

    // panel that contains radio buttons for selecting a predictive model
    const predictiveModelPanel = new PredictiveModelPanel( model.predictiveModelProperty, model.predictiveModels );

    const modelVBox = new VBox( {
      children: [ experimentPredictionSwitch, predictiveModelPanel ],
      align: 'center',
      spacing: 10,
      left: zoomBoxNode.right + 30,
      top: zoomBoxNode.top,
      excludeInvisibleChildrenFromBounds: false
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
      content: new Text( modelsOfTheHydrogenAtomStrings.viewSnapshots, { font: new PhetFont( 16 ) } ),
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
    this.addChild( lightModeRadioButtonGroup );
    this.addChild( monochromaticControls );
    this.addChild( boxOfHydrogenNode );
    this.addChild( tinyBoxNode );
    this.addChild( timeControlNode );
    this.addChild( zoomBoxNode );
    this.addChild( dashedLines );
    this.addChild( beamNode );
    this.addChild( lightNode );
    this.addChild( modelVBox );
    this.addChild( spectrometerAccordionBox );
    this.addChild( viewSnapshotsButton );
    this.addChild( resetAllButton );

    viewProperties.experimentEnabledProperty.link( experimentEnabled => {
      predictiveModelPanel.visible = !experimentEnabled;
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

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );
export default SpectraScreenView;