// Copyright 2015-2024, University of Colorado Boulder

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
import { Node, Path, VBox } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import BeamNode from '../../common/view/BeamNode.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentModelSwitch from '../../common/view/ExperimentModelSwitch.js';
import LegendPanel from '../../common/view/LegendPanel.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import ModelPanel from '../../common/view/ModelPanel.js';
import SnapshotsDialog from '../../common/view/SnapshotsDialog.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import SpectraViewProperties from './SpectraViewProperties.js';
import ViewSnapshotsButton from '../../common/view/ViewSnapshotsButton.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { LightControlPanel } from '../../common/view/LightControlPanel.js';

export default class SpectraScreenView extends ScreenView {

  private readonly model: SpectraModel;
  private readonly zoomedInBoxNode: SpectraZoomedInBoxNode;

  public constructor( model: SpectraModel, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem
    } );

    const viewProperties = new SpectraViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    // Parent for any popups
    const popupsParent = new Node();

    // Legend for particle types
    const legendPanel = new LegendPanel( {
      left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      top: this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'legendPanel' )
    } );

    // Light
    const lightNode = new LaserPointerNode( model.light.onProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonRadius: 19,
      rotation: -Math.PI / 2, // pointing up
      left: this.layoutBounds.left + 100,
      bottom: 415,
      tandem: tandem.createTandem( 'lightNode' )
    } );

    // Beam of light
    const beamNode = new BeamNode( {
      visibleProperty: model.light.onProperty,
      fill: model.light.colorProperty,
      centerX: lightNode.centerX,
      bottom: lightNode.top + 1,
      tandem: tandem.createTandem( 'beamNode' )
    } );

    // Controls for the light
    const lightControlPanel = new LightControlPanel(
      model.light.lightModeProperty,
      model.light.monochromaticWavelengthProperty, {
        left: this.layoutBounds.left + 30,
        top: lightNode.bottom + 10,
        tandem: tandem.createTandem( 'lightControlPanel' )
      } );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode( {
      centerX: beamNode.centerX,
      bottom: beamNode.top + 1,
      tandem: tandem.createTandem( 'boxOfHydrogenNode' )
    } );

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20,
      tandem: tandem.createTandem( 'tinyBoxNode' )
    } );

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, {
      left: lightNode.right + 50,
      top: this.layoutBounds.top + 15,
      tandem: tandem.createTandem( 'zoomedInBoxNode' )
    } );

    // Dashed lines that connect the tiny box and zoom box
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      tandem: tandem.createTandem( 'dashedLines' )
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.modelModeProperty, {
      tandem: tandem.createTandem( 'experimentModelSwitch' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const modelPanel = new ModelPanel( model.predictiveModelProperty, model.predictiveModels, model.modelModeProperty, {
      tandem: tandem.createTandem( 'modelPanel' )
    } );

    const modelVBox = new VBox( {
      children: [ experimentModelSwitch, modelPanel ],
      align: 'center',
      spacing: 10,
      left: zoomedInBoxNode.right + 30,
      top: zoomedInBoxNode.top,
      excludeInvisibleChildrenFromBounds: false
    } );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox( viewProperties.numberOfSnapshotsProperty, {
      expandedProperty: viewProperties.spectrometerExpandedProperty,
      left: lightControlPanel.right + 10,
      top: lightControlPanel.top,
      tandem: tandem.createTandem( 'spectrometerAccordionBox' )
    } );

    // Constructed eagerly and reused to appease PhET-iO.
    const snapshotsDialog = new SnapshotsDialog( viewProperties.numberOfSnapshotsProperty, {
      tandem: tandem.createTandem( 'snapshotsDialog' )
    } );

    // View Snapshots button, above upper-right corner of spectrometer
    const viewSnapshotsButton = new ViewSnapshotsButton( viewProperties.numberOfSnapshotsProperty, {
      listener: () => snapshotsDialog.show(),
      tandem: tandem.createTandem( 'viewSnapshotsButton' )
    } );
    viewSnapshotsButton.localBoundsProperty.link( () => {
      viewSnapshotsButton.right = spectrometerAccordionBox.right;
      viewSnapshotsButton.bottom = spectrometerAccordionBox.top - 10;
    } );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty,
      model.stepOnce.bind( model ), {
        left: modelVBox.left,
        centerY: modelVBox.bottom + ( spectrometerAccordionBox.top - modelVBox.bottom ) / 2,
        tandem: tandem.createTandem( 'timeControlNode' )
      } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // rendering order
    const screenViewRootNode = new Node( {
      children: [
        legendPanel,
        timeControlNode,
        beamNode,
        lightNode,
        lightControlPanel,
        boxOfHydrogenNode,
        tinyBoxNode,
        dashedLines,
        zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        viewSnapshotsButton,
        resetAllButton,
        popupsParent
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      //TODO
      lightControlPanel,
      lightNode,
      modelVBox,
      timeControlNode,
      spectrometerAccordionBox,
      viewSnapshotsButton
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      //TODO
    ];

    this.model = model;
    this.zoomedInBoxNode = zoomedInBoxNode;
  }

  public override step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.zoomedInBoxNode.step( dt );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );