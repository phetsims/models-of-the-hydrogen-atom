// Copyright 2015-2025, University of Colorado Boulder

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
import { Node, Path, Rectangle, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
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
import SpectraModel from '../model/SpectraModel.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';

export default class SpectraScreenView extends ScreenView {

  private readonly model: SpectraModel;
  private readonly zoomedInBoxNode: SpectraZoomedInBoxNode;

  public constructor( model: SpectraModel, tandem: Tandem ) {

    super( {
      isDisposable: false,
      screenSummaryContent: new ScreenSummaryContent( {
        additionalContent: [
          ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.playAreaStringProperty,
          ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.controlAreaStringProperty,
          ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.interactionHintStringProperty
        ]
      } ),
      tandem: tandem
    } );

    // Parent for any popups
    const popupsParent = new Node();

    // Legend for particle types
    const legendPanel = new LegendPanel( tandem.createTandem( 'legendPanel' ) );

    // Light
    const lightNode = new LightNode( model.light, tandem.createTandem( 'lightNode' ) );

    // Controls for the light
    const lightControlPanel = new LightControlPanel( model.light, model.isQuantumModelProperty, model.isExperimentProperty,
      tandem.createTandem( 'lightControlPanel' ) );

    const transitionsDialogVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'transitionsDialogVisibleProperty' ),
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
      model.isQuantumModelProperty, tandem.createTandem( 'transitionsCheckbox' ) );

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, tandem.createTandem( 'zoomedInBoxNode' ) );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.isExperimentProperty, tandem.createTandem( 'experimentModelSwitch' ) );

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
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, tandem.createTandem( 'spectrometerAccordionBox' ) );

    // Time controls
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty,
      model.stepOnce.bind( model ), tandem.createTandem( 'timeControlNode' ) );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        transitionsDialogVisibleProperty.reset();
        transitionsDialog.reset();
        spectrometerAccordionBox.reset();
      },
      tandem: tandem.createTandem( 'resetAllButton' )
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
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      visibleProperty: DerivedProperty.and( [ zoomedInBoxNode.visibleProperty, boxOfHydrogenNode.visibleProperty ] )
    } );

    const transitionsDialog = new TransitionsDialog( model.light.monochromaticWavelengthProperty,
      model.light.lightModeProperty, model.isExperimentProperty, this.visibleBoundsProperty, {
        position: modelVBox.leftTop,
        visibleProperty: transitionsDialogVisibleProperty,
        tandem: tandem.createTandem( 'transitionsDialog' )
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
        zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        resetAllButton,
        transitionsDialog,
        popupsParent
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      lightNode,
      lightControlPanel,
      transitionsCheckbox,
      transitionsDialog,
      modelVBox,
      zoomedInBoxNode
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      spectrometerAccordionBox,
      timeControlNode,
      resetAllButton
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