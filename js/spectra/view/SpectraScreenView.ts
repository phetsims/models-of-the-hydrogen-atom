// Copyright 2015-2024, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node, Path, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import AbsorptionAndEmissionCheckbox from '../../common/view/AbsorptionAndEmissionCheckbox.js';
import AbsorptionAndEmissionDialog from '../../common/view/AbsorptionAndEmissionDialog.js';
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
import SpectraModel from '../model/SpectraModel.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';

export default class SpectraScreenView extends ScreenView {

  private readonly zoomedInBoxNode: SpectraZoomedInBoxNode;

  public constructor( model: SpectraModel, tandem: Tandem ) {

    super( {

      // ScreenViewOptions
      isDisposable: false,
      screenSummaryContent: new ScreenSummaryContent( [
        ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.playAreaStringProperty,
        ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.controlAreaStringProperty,
        ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.interactionHintStringProperty
      ] ),
      tandem: tandem
    } );

    // Parent for any popups
    const popupsParent = new Node();

    // Legend for particle types
    const legendPanel = new LegendPanel( {
      tandem: tandem.createTandem( 'legendPanel' )
    } );

    // Light
    const lightNode = new LightNode( model.light, {
      tandem: tandem.createTandem( 'lightNode' )
    } );

    // Controls for the light
    const lightControlPanel = new LightControlPanel( model.light, model.isQuantumModelProperty, model.isExperimentProperty, {
      tandem: tandem.createTandem( 'lightControlPanel' )
    } );

    const absorptionAndEmissionDialogVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'absorptionAndEmissionDialogVisibleProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true // because the sim controls this
    } );

    // Hide the dialog when a classical model is being viewed.
    model.isQuantumModelProperty.link( isQuantumModel => {
      if ( absorptionAndEmissionDialogVisibleProperty.value ) {
        absorptionAndEmissionDialogVisibleProperty.value = isQuantumModel;
      }
    } );

    const absorptionAndEmissionCheckbox = new AbsorptionAndEmissionCheckbox( absorptionAndEmissionDialogVisibleProperty,
      model.isQuantumModelProperty, {
        tandem: tandem.createTandem( 'absorptionAndEmissionCheckbox' )
      } );

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, {
      tandem: tandem.createTandem( 'zoomedInBoxNode' )
    } );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.isExperimentProperty, {
      tandem: tandem.createTandem( 'experimentModelSwitch' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const modelPanel = new ModelPanel( model.predictiveModelProperty, model.predictiveModels, model.isExperimentProperty, {
      radioButtonTextMaxWidth: 200,
      tandem: tandem.createTandem( 'modelPanel' )
    } );

    const modelVBox = new VBox( {
      children: [ experimentModelSwitch, modelPanel ],
      align: 'center',
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    } );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, {
      tandem: tandem.createTandem( 'spectrometerAccordionBox' )
    } );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty, model.stepOnce.bind( model ), {
      tandem: tandem.createTandem( 'timeControlNode' )
    } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        absorptionAndEmissionDialogVisibleProperty.reset();
        absorptionAndEmissionDialog.reset();
        spectrometerAccordionBox.reset();
      },
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // Layout is complicated, so do it all in one place, rather than via NodeTranslationOptions.
    legendPanel.left = this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    legendPanel.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightNode.left = this.layoutBounds.left + 125;
    lightControlPanel.left = this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    zoomedInBoxNode.left = lightNode.right + 50;
    zoomedInBoxNode.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightNode.bottom = zoomedInBoxNode.bottom;
    lightControlPanel.top = zoomedInBoxNode.bottom + 15;
    boxOfHydrogenNode.centerX = lightNode.centerX;
    boxOfHydrogenNode.bottom = lightNode.top + 1;
    tinyBoxNode.left = boxOfHydrogenNode.right - boxOfHydrogenNode.width / 3;
    tinyBoxNode.centerY = boxOfHydrogenNode.centerY;
    modelVBox.left = zoomedInBoxNode.right + 30;
    modelVBox.top = zoomedInBoxNode.top;
    spectrometerAccordionBox.left = lightControlPanel.right + 12;
    spectrometerAccordionBox.top = lightControlPanel.top;
    timeControlNode.left = modelVBox.left;
    timeControlNode.centerY = modelVBox.bottom + ( spectrometerAccordionBox.top - modelVBox.bottom ) / 2;
    absorptionAndEmissionCheckbox.localBoundsProperty.link( () => {
      absorptionAndEmissionCheckbox.centerX = lightControlPanel.centerX;
      absorptionAndEmissionCheckbox.top = lightControlPanel.bottom + 5;
    } );
    resetAllButton.right = this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN;
    resetAllButton.bottom = this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN;

    // Now continue with things that depend on the above layout.

    // Dashed lines that connect the tiny box and zoom box. Do this after layout!
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      visibleProperty: DerivedProperty.and( [ zoomedInBoxNode.visibleProperty, boxOfHydrogenNode.visibleProperty ] )
    } );

    const absorptionAndEmissionDialog = new AbsorptionAndEmissionDialog( model.light.monochromaticWavelengthProperty,
      model.light.lightModeProperty, model.isExperimentProperty, this.visibleBoundsProperty, {
        position: modelVBox.leftTop,
        visibleProperty: absorptionAndEmissionDialogVisibleProperty,
        tandem: tandem.createTandem( 'absorptionAndEmissionDialog' )
      } );

    // rendering order
    const screenViewRootNode = new Node( {
      children: [
        legendPanel,
        timeControlNode,
        lightNode,
        lightControlPanel,
        absorptionAndEmissionCheckbox,
        boxOfHydrogenNode,
        tinyBoxNode,
        dashedLines,
        zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        resetAllButton,
        absorptionAndEmissionDialog,
        popupsParent
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      lightNode,
      lightControlPanel,
      absorptionAndEmissionCheckbox,
      absorptionAndEmissionDialog,
      modelVBox,
      zoomedInBoxNode
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      spectrometerAccordionBox,
      timeControlNode,
      zoomedInBoxNode.schrodingerQuantumNumbersInfoButton,
      resetAllButton
    ];

    this.zoomedInBoxNode = zoomedInBoxNode;
  }

  public override step( dt: number ): void {
    this.zoomedInBoxNode.step( dt );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );