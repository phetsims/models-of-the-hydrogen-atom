// Copyright 2025, University of Colorado Boulder

/**
 * MOTHAScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node, Path, Rectangle, VBox } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import TransitionsCheckbox from '../../common/view/TransitionsCheckbox.js';
import TransitionsDialog from '../../common/view/TransitionsDialog.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentModelSwitch from '../../common/view/ExperimentModelSwitch.js';
import LegendPanel from '../../common/view/LegendPanel.js';
import { LightControlPanel } from '../../common/view/LightControlPanel.js';
import { LightNode } from '../../common/view/LightNode.js';
import ModelPanel from '../../common/view/ModelPanel.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MOTHAModel from '../model/MOTHAModel.js';
import ElectronEnergyLevelAccordionBox from '../../energylevels/view/ElectronEnergyLevelAccordionBox.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';

type SelfOptions = {
  zoomedInBoxNode: ZoomedInBoxNode;
  popupsParent: Node;
  electronEnergyLevelAccordionBox?: ElectronEnergyLevelAccordionBox | null; // Optional, for layout
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

      // ScreenViewOptions
      isDisposable: false,
      screenSummaryContent: new ScreenSummaryContent( {
        additionalContent: [
          ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.playAreaStringProperty,
          ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.controlAreaStringProperty,
          ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.interactionHintStringProperty
        ]
      } )
    }, providedOptions );

    super( options );

    this.model = model;
    this.zoomedInBoxNode = options.zoomedInBoxNode;
    this.electronEnergyLevelAccordionBox = options.electronEnergyLevelAccordionBox;

    // Legend for particle types
    const legendPanel = new LegendPanel( options.tandem.createTandem( 'legendPanel' ) );

    // Light
    const lightNode = new LightNode( model.light, options.tandem.createTandem( 'lightNode' ) );

    // Controls for the light
    const lightControlPanel = new LightControlPanel( model.light, model.isQuantumModelProperty, model.isExperimentProperty,
      options.tandem.createTandem( 'lightControlPanel' ) );

    const transitionsDialogVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'transitionsDialogVisibleProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true // because the sim controls this
    } );

    // Hide the dialog when a classical model is being viewed.
    model.isQuantumModelProperty.link( isQuantumModel => {
      if ( transitionsDialogVisibleProperty.value ) {
        transitionsDialogVisibleProperty.value = isQuantumModel;
      }
    } );

    const transitionsCheckbox = new TransitionsCheckbox( transitionsDialogVisibleProperty,
      model.isQuantumModelProperty, options.tandem.createTandem( 'transitionsCheckbox' ) );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.isExperimentProperty, options.tandem.createTandem( 'experimentModelSwitch' ) );

    // panel that contains radio buttons for selecting a predictive model
    const modelPanel = new ModelPanel( model.predictiveModelProperty, model.predictiveModels, model.isExperimentProperty, {
      radioButtonTextMaxWidth: 120,
      hasContinuumBar: false,
      tandem: options.tandem.createTandem( 'modelPanel' )
    } );

    const modelVBox = new VBox( {
      children: [ experimentModelSwitch, modelPanel ],
      align: 'center',
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    } );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, options.tandem.createTandem( 'spectrometerAccordionBox' ) );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty,
      model.stepOnce.bind( model ), options.tandem.createTandem( 'timeControlNode' ) );

    this.resetAllMOTHAScreenView = () => {
      model.reset();
      transitionsDialogVisibleProperty.reset();
      transitionsDialog.reset();
      spectrometerAccordionBox.reset();
    };

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => this.resetAll(),
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Workaround for joist deficiency that requires exactly 'black' and 'white' screen background color in
    // order to get the desired navigation bar color. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/96.
    const screenBackgroundRectangle = new Rectangle( 0, 0, 1, 1, {
      fill: MOTHAColors.screenBackgroundRectangleColorProperty
    } );
    this.visibleBoundsProperty.link( visibleBounds => screenBackgroundRectangle.setRectBounds( visibleBounds ) );

    // Layout is complicated, so do it all in one place, rather than via NodeTranslationOptions.
    legendPanel.left = this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    legendPanel.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightNode.left = this.layoutBounds.left + 35;
    lightControlPanel.left = this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    this.zoomedInBoxNode.left = lightNode.right + 50;
    this.zoomedInBoxNode.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightNode.bottom = this.zoomedInBoxNode.bottom;
    lightControlPanel.top = this.zoomedInBoxNode.bottom + 15;
    boxOfHydrogenNode.centerX = lightNode.centerX;
    boxOfHydrogenNode.bottom = lightNode.top + 1;
    tinyBoxNode.left = boxOfHydrogenNode.right - boxOfHydrogenNode.width / 3;
    tinyBoxNode.centerY = boxOfHydrogenNode.centerY;
    spectrometerAccordionBox.left = lightControlPanel.right + 12;
    spectrometerAccordionBox.top = lightControlPanel.top;
    if ( this.electronEnergyLevelAccordionBox ) {
      this.electronEnergyLevelAccordionBox.left = this.zoomedInBoxNode.right + 10;
      this.electronEnergyLevelAccordionBox.top = this.zoomedInBoxNode.top;
      modelVBox.left = this.electronEnergyLevelAccordionBox.right + 10;
      modelVBox.top = this.electronEnergyLevelAccordionBox.top;
      timeControlNode.left = this.electronEnergyLevelAccordionBox.right + 15;
    }
    else {
      modelVBox.left = this.zoomedInBoxNode.right + 30;
      modelVBox.top = this.zoomedInBoxNode.top;
      timeControlNode.left = modelVBox.left;
    }
    timeControlNode.centerY = modelVBox.bottom + ( spectrometerAccordionBox.top - modelVBox.bottom ) / 2;
    transitionsCheckbox.localBoundsProperty.link( () => {
      transitionsCheckbox.centerX = lightControlPanel.centerX;
      transitionsCheckbox.top = lightControlPanel.bottom + 5;
    } );
    resetAllButton.right = this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    resetAllButton.bottom = this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN;

    // Now continue with things that depend on the above layout.

    // Dashed lines that connect the tiny box and zoom box. Do this after layout!
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( this.zoomedInBoxNode.left, this.zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( this.zoomedInBoxNode.left, this.zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      visibleProperty: DerivedProperty.and( [ this.zoomedInBoxNode.visibleProperty, boxOfHydrogenNode.visibleProperty ] )
    } );

    const transitionsDialog = new TransitionsDialog( model.light.monochromaticWavelengthProperty,
      model.light.lightModeProperty, model.isExperimentProperty, this.visibleBoundsProperty, {
        position: modelVBox.leftTop,
        visibleProperty: transitionsDialogVisibleProperty,
        tandem: options.tandem.createTandem( 'transitionsDialog' )
      } );

    // rendering order
    const screenViewRootNode = new Node( {
      children: [
        screenBackgroundRectangle,
        legendPanel,
        timeControlNode,
        lightNode,
        lightControlPanel,
        transitionsCheckbox,
        boxOfHydrogenNode,
        tinyBoxNode,
        dashedLines,
        this.zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        this.electronEnergyLevelAccordionBox ? this.electronEnergyLevelAccordionBox : new Rectangle( 0, 0, 1, 1 ), //TODO Eliminate this hack.
        resetAllButton,
        transitionsDialog,
        options.popupsParent
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      lightNode,
      lightControlPanel,
      transitionsCheckbox,
      transitionsDialog,
      null, //TODO electronEnergyLevelAccordionBox goes here if it was provided.
      modelVBox,
      this.zoomedInBoxNode
    ];

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