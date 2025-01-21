// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHAScreenView is the base class for the ScreenView in both screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { HBox, Node, Path, Rectangle, VBox } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import TransitionsCheckbox from '../../common/view/TransitionsCheckbox.js';
import TransitionsDialog from '../../common/view/TransitionsDialog.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentModelSwitch from '../../common/view/ExperimentModelSwitch.js';
import LegendPanel from '../../common/view/LegendPanel.js';
import { LightControlPanel } from './LightControlPanel.js';
import { LightSourceNode } from './LightSourceNode.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MOTHAModel from '../model/MOTHAModel.js';
import ElectronEnergyLevelAccordionBox from '../../energylevels/view/ElectronEnergyLevelAccordionBox.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';
import SpectrometerSnapshotsDialog from './SpectrometerSnapshotsDialog.js';
import AtomicModelRadioButtonGroup from './AtomicModelRadioButtonGroup.js';
import ContinuumBarNode from './ContinuumBarNode.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

type SelfOptions = {

  // Parent Node for any popups.
  popupsParent: Node;

  // The zoomed-in view of the box of hydrogen.
  zoomedInBoxNode: ZoomedInBoxNode;

  // Optional accordion box with Electron Energy Level diagrams, present in the Energy Levels screen.
  electronEnergyLevelAccordionBox?: ElectronEnergyLevelAccordionBox | null;

  // x-offset of lightNode from the left edge of layoutBounds.
  lightNodeXOffset: number;

  // propagated to ModelPanel.
  modelRadioButtonTextMaxWidth: number;

  // whether to add a 'Classical...Quantum' continuum bar
  hasContinuumBar?: boolean;

  // Description screen summary.
  screenSummaryContent: ScreenSummaryContent;
};

type MOTHAScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'>;

export default class MOTHAScreenView extends ScreenView {

  private readonly model: MOTHAModel;
  private readonly zoomedInBoxNode: ZoomedInBoxNode;
  private readonly electronEnergyLevelAccordionBox: ElectronEnergyLevelAccordionBox | null;
  private readonly resetAllMOTHAScreenView: () => void;

  protected constructor( model: MOTHAModel, providedOptions: MOTHAScreenViewOptions ) {

    const options = optionize<MOTHAScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // SelfOptions
      electronEnergyLevelAccordionBox: null,
      hasContinuumBar: true,

      // ScreenViewOptions
      isDisposable: false
    }, providedOptions );

    super( options );

    this.model = model;
    this.zoomedInBoxNode = options.zoomedInBoxNode;
    this.electronEnergyLevelAccordionBox = options.electronEnergyLevelAccordionBox;

    // Legend for particle types
    const legendPanel = new LegendPanel( options.tandem.createTandem( 'legendPanel' ) );

    // Light source
    const lightSourceNode = new LightSourceNode( model.lightSource, options.tandem.createTandem( 'lightSourceNode' ) );

    // Controls for the type of light emitted by the light source
    const lightControlPanel = new LightControlPanel( model.lightSource.lightModeProperty,
      model.lightSource.monochromaticWavelengthProperty, model.isQuantumModelProperty, model.isExperimentProperty,
      options.tandem.createTandem( 'lightControlPanel' ) );

    const transitionsDialog = new TransitionsDialog( model.lightSource.monochromaticWavelengthProperty,
      model.lightSource.lightModeProperty, model.isExperimentProperty, this.visibleBoundsProperty, {
        tandem: options.tandem.createTandem( 'transitionsDialog' )
      } );

    // Hide the dialog when a classical model is being viewed.
    model.isQuantumModelProperty.link( isQuantumModel => {
      if ( !isSettingPhetioStateProperty.value && transitionsDialog.isShowingProperty.value ) {
        transitionsDialog.isShowingProperty.value = isQuantumModel;
      }
    } );

    const transitionsCheckbox = new TransitionsCheckbox( transitionsDialog.isShowingProperty,
      model.isQuantumModelProperty, options.tandem.createTandem( 'transitionsCheckbox' ) );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.isExperimentProperty,
      options.tandem.createTandem( 'experimentModelSwitch' ) );

    const atomicModelRadioButtonGroup = new AtomicModelRadioButtonGroup( model.atomicModelProperty, model.atomicModels, {
      radioButtonTextMaxWidth: providedOptions.modelRadioButtonTextMaxWidth,
      tandem: options.tandem.createTandem( 'atomicModelRadioButtonGroup' )
    } );

    const modelVBox = new VBox( {
      children: [ experimentModelSwitch, atomicModelRadioButtonGroup ],
      align: 'center',
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    } );

    let modelBox: Node;
    if ( options.hasContinuumBar ) {
      const continuumBarNode = new ContinuumBarNode( atomicModelRadioButtonGroup.height, options.tandem.createTandem( 'continuumBarNode' ) );
      modelBox = new HBox( {
        align: 'bottom',
        spacing: 10,
        children: [ continuumBarNode, modelVBox ]
      } );
    }
    else {
      modelBox = modelVBox;
    }

    // Spectrometer snapshots dialog
    const spectrometerSnapshotsDialog = new SpectrometerSnapshotsDialog( model.spectrometer.snapshots,
      options.tandem.createTandem( 'spectrometerSnapshotsDialog' ) );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, spectrometerSnapshotsDialog,
      options.tandem.createTandem( 'spectrometerAccordionBox' ) );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty,
      model.stepOnce.bind( model ), options.tandem.createTandem( 'timeControlNode' ) );

    this.resetAllMOTHAScreenView = () => {
      model.reset();
      transitionsDialog.reset();
      spectrometerAccordionBox.reset();
      spectrometerSnapshotsDialog.hide();
    };

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => this.resetAll(),
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Workaround for joist deficiency that requires exactly 'black' and 'white' screen background color in order
    // to get the desired navigation bar color. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/96.
    const screenBackgroundRectangle = new Rectangle( 0, 0, 1, 1, {
      fill: MOTHAColors.screenBackgroundRectangleColorProperty
    } );
    this.visibleBoundsProperty.link( visibleBounds => screenBackgroundRectangle.setRectBounds( visibleBounds ) );

    //TODO Make another attempt at using HBox/VBox here.

    // The more complicated part of layout involves everything above the Spectrometer. Trying to do this with
    // HBox/VBox was even more complicated, and made it more difficult to tweak the layout (which we did often).
    // So this brute-force approach eventually became the preferred choice.
    lightSourceNode.left = this.layoutBounds.left + options.lightNodeXOffset;
    this.zoomedInBoxNode.left = lightSourceNode.right + 50;
    this.zoomedInBoxNode.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightSourceNode.bottom = this.zoomedInBoxNode.bottom;
    boxOfHydrogenNode.centerX = lightSourceNode.centerX;
    boxOfHydrogenNode.bottom = lightSourceNode.top + 1;
    tinyBoxNode.left = boxOfHydrogenNode.right - boxOfHydrogenNode.width / 3;
    tinyBoxNode.centerY = boxOfHydrogenNode.centerY;
    if ( this.electronEnergyLevelAccordionBox ) {

      // If we have electronEnergyLevelAccordionBox, it goes between zoomedInBox and modelBox.
      const electronEnergyLevelAccordionBox = this.electronEnergyLevelAccordionBox;
      electronEnergyLevelAccordionBox.visibleProperty.link( visible => {
        if ( visible ) {
          electronEnergyLevelAccordionBox.left = this.zoomedInBoxNode.right + 10;
          electronEnergyLevelAccordionBox.top = this.zoomedInBoxNode.top;
          modelBox.left = electronEnergyLevelAccordionBox.right + 10;
          modelBox.top = electronEnergyLevelAccordionBox.top;
          timeControlNode.left = electronEnergyLevelAccordionBox.right + 15;
        }
        else {
          //TODO This is a duplicate of code below.
          modelBox.left = this.zoomedInBoxNode.right + 30;
          modelBox.top = this.zoomedInBoxNode.top;
          timeControlNode.left = modelBox.left;
        }
      } );
    }
    else {

      // If we do not have electronEnergyLevelAccordionBox, zoomedInBox and modelBox are next to each other.
      modelBox.left = this.zoomedInBoxNode.right + 30;
      modelBox.top = this.zoomedInBoxNode.top;
      timeControlNode.left = modelBox.left;
    }
    timeControlNode.bottom = this.zoomedInBoxNode.bottom;

    // Layout of elements below zoomedInBoxNode is well-suited to using HBox/VBox.
    const bottomHBox = new HBox( {
      align: 'top',
      spacing: 12,
      children: [
        new VBox( {
          excludeInvisibleChildrenFromBounds: false,
          align: 'center',
          spacing: 5,
          children: [ lightControlPanel, transitionsCheckbox ]
        } ),
        spectrometerAccordionBox
      ],
      left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      top: this.zoomedInBoxNode.bottom + 15
    } );

    // Layout of misc. elements
    transitionsDialog.setInitialPosition( modelBox.leftTop );
    legendPanel.left = this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    legendPanel.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    resetAllButton.right = this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    resetAllButton.bottom = this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN;

    // Now that layout is done, we can add the dashed lines that connect the tiny box and zoomed-in box.
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( this.zoomedInBoxNode.left, this.zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( this.zoomedInBoxNode.left, this.zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      visibleProperty: DerivedProperty.and( [ this.zoomedInBoxNode.visibleProperty, boxOfHydrogenNode.visibleProperty ] )
    } );

    // rendering order
    const screenViewRootNodeChildren = [
      screenBackgroundRectangle,
      legendPanel,
      timeControlNode,
      lightSourceNode,
      boxOfHydrogenNode,
      tinyBoxNode,
      dashedLines,
      this.zoomedInBoxNode,
      modelBox,
      bottomHBox,
      resetAllButton,
      transitionsDialog,
      options.popupsParent
    ];
    if ( this.electronEnergyLevelAccordionBox ) {
      // Add optional electronEnergyLevelAccordionBox before resetAllButton.
      const index = screenViewRootNodeChildren.indexOf( resetAllButton );
      screenViewRootNodeChildren.splice( index, 0, this.electronEnergyLevelAccordionBox );
    }
    const screenViewRootNode = new Node( {
      children: screenViewRootNodeChildren
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    const playAreaPDOMOrder = [
      lightSourceNode,
      lightControlPanel,
      transitionsCheckbox,
      transitionsDialog,
      modelBox,
      this.zoomedInBoxNode
    ];
    if ( this.electronEnergyLevelAccordionBox ) {
      // Add optional electronEnergyLevelAccordionBox before modelBox.
      const index = playAreaPDOMOrder.indexOf( modelBox );
      playAreaPDOMOrder.splice( index, 0, this.electronEnergyLevelAccordionBox );
    }
    this.pdomPlayAreaNode.pdomOrder = playAreaPDOMOrder;

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      spectrometerAccordionBox,
      timeControlNode,
      resetAllButton
    ];
  }

  protected resetAll(): void {
    this.resetAllMOTHAScreenView();
  }

  public override step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.zoomedInBoxNode.step( dt );
      this.electronEnergyLevelAccordionBox && this.electronEnergyLevelAccordionBox.step( dt );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAScreenView', MOTHAScreenView );