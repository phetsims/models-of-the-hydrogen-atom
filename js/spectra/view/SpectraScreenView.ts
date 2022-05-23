// Copyright 2015-2022, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Node, Path, VBox } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import BeamNode from '../../common/view/BeamNode.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentPredictionSwitch from '../../common/view/ExperimentPredictionSwitch.js';
import LegendNode from '../../common/view/LegendNode.js';
import LightModeRadioButtonGroup from '../../common/view/LightModeRadioButtonGroup.js';
import MonochromaticControls from '../../common/view/MonochromaticControls.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import PredictionPanel from '../../common/view/PredictionPanel.js';
import SnapshotsDialog from '../../common/view/SnapshotsDialog.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import SpectraViewProperties from './SpectraViewProperties.js';
import ViewSnapshotsButton from '../../common/view/ViewSnapshotsButton.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';

type SelfOptions = {};

type SpectraScreenViewOptions = SelfOptions & ScreenViewOptions;

class SpectraScreenView extends ScreenView {

  constructor( model: SpectraModel, providedOptions: SpectraScreenViewOptions ) {

    const options = optionize<SpectraScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      //TODO
    }, providedOptions );

    super( options );

    const viewProperties = new SpectraViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    // +y is up in the model, down in the view.
    // We're using a non-unity scale to be certain that the transform is being used where it should be.
    const modelToViewScale = 0.5;
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( Vector2.ZERO, modelToViewScale, -modelToViewScale );

    // Legend
    const legendNode = new LegendNode( {
      left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      top: this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'legendNode' )
    } );

    // Light Mode radio button group
    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( model.light.lightModeProperty, {
      left: this.layoutBounds.left + 30,
      bottom: 415,
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    // Controls for monochromatic light
    const monochromaticControls = new MonochromaticControls(
      model.modelModeProperty,
      model.predictiveModelProperty,
      model.light.wavelengthProperty,
      viewProperties.absorptionWavelengthsVisibleProperty, {
        left: lightModeRadioButtonGroup.left,
        top: lightModeRadioButtonGroup.bottom + 15,
        tandem: options.tandem.createTandem( 'monochromaticControls' )
      } );

    // Light
    const lightNode = new LaserPointerNode( model.light.onProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonRadius: 19,
      rotation: -Math.PI / 2, // pointing up
      left: lightModeRadioButtonGroup.right + 20,
      bottom: lightModeRadioButtonGroup.bottom,
      tandem: options.tandem.createTandem( 'lightNode' )
    } );

    // Beam of light
    const beamNode = new BeamNode( {
      visibleProperty: model.light.onProperty,
      fill: model.light.colorProperty,
      centerX: lightNode.centerX,
      bottom: lightNode.top + 1,
      tandem: options.tandem.createTandem( 'beamNode' )
    } );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode( {
      centerX: beamNode.centerX,
      bottom: beamNode.top + 1,
      tandem: options.tandem.createTandem( 'boxOfHydrogenNode' )
    } );

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20,
      tandem: options.tandem.createTandem( 'tinyBoxNode' )
    } );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty, {
      left: monochromaticControls.left,
      top: monochromaticControls.bottom + 8,
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, modelViewTransform, {
      left: lightNode.right + 50,
      top: this.layoutBounds.top + 15,
      tandem: options.tandem.createTandem( 'zoomedInBoxNode' )
    } );

    // Dashed lines that connect the tiny box and zoom box
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.boxStrokeProperty,
      lineDash: [ 5, 5 ],
      tandem: options.tandem.createTandem( 'dashedLines' )
    } );

    // switches the model mode between Experiment and Prediction
    const experimentPredictionSwitch = new ExperimentPredictionSwitch( model.modelModeProperty, {
      tandem: options.tandem.createTandem( 'experimentPredictionSwitch' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const predictionPanel = new PredictionPanel( model.predictiveModelProperty, model.predictiveModels, {
      tandem: options.tandem.createTandem( 'predictionPanel' )
    } );

    const modelVBox = new VBox( {
      children: [ experimentPredictionSwitch, predictionPanel ],
      align: 'center',
      spacing: 10,
      left: zoomedInBoxNode.right + 30,
      top: zoomedInBoxNode.top,
      excludeInvisibleChildrenFromBounds: false
    } );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox(
      viewProperties.spectrometerExpandedProperty, viewProperties.numberOfSnapshotsProperty, {
        left: monochromaticControls.right + 10,
        top: monochromaticControls.top,
        tandem: options.tandem.createTandem( 'spectrometerAccordionBox' )
      } );

    // Constructed eagerly and reused to appease PhET-iO.
    const snapshotsDialog = new SnapshotsDialog( viewProperties.numberOfSnapshotsProperty, {
      tandem: options.tandem.createTandem( 'snapshotsDialog' )
    } );

    // View Snapshots button, above upper-right corner of spectrometer
    const viewSnapshotsButton = new ViewSnapshotsButton( {
      listener: () => snapshotsDialog.show(),
      right: spectrometerAccordionBox.right,
      bottom: spectrometerAccordionBox.top - 10,
      tandem: options.tandem.createTandem( 'viewSnapshotsButton' )
    } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // rendering order
    const screenViewRootNode = new Node( {
      children: [
        legendNode,
        timeControlNode,
        beamNode,
        lightNode,
        lightModeRadioButtonGroup,
        monochromaticControls,
        boxOfHydrogenNode,
        tinyBoxNode,
        dashedLines,
        zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        viewSnapshotsButton,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // pdom - traversal order
    screenViewRootNode.pdomOrder = [
      lightModeRadioButtonGroup,
      lightNode,
      modelVBox,
      timeControlNode,
      spectrometerAccordionBox,
      viewSnapshotsButton
    ];

    model.modelModeProperty.link( modelMode => {
      predictionPanel.visible = ( modelMode === 'prediction' );
    } );

    // Visibility of monochromatic light controls
    model.light.lightModeProperty.link( lightMode => {
      monochromaticControls.visible = ( lightMode === 'monochromatic' );
    } );

    // Show 'View snapshots' button when there are snapshots available
    viewProperties.numberOfSnapshotsProperty.link( numberOfSnapshots => {
      viewSnapshotsButton.visible = ( numberOfSnapshots > 0 );
    } );
  }

  public override step( dt: number ): void {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );
export default SpectraScreenView;