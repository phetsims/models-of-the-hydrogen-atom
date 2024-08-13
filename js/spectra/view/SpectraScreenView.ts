// Copyright 2015-2024, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node, Path, VBox } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import ExperimentModelSwitch from '../../common/view/ExperimentModelSwitch.js';
import LegendPanel from '../../common/view/LegendPanel.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import ModelPanel from '../../common/view/ModelPanel.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { LightControlPanel } from '../../common/view/LightControlPanel.js';
import { LightNode } from '../../common/view/LightNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class SpectraScreenView extends ScreenView {

  private readonly model: SpectraModel;
  private readonly zoomedInBoxNode: SpectraZoomedInBoxNode;

  public constructor( model: SpectraModel, tandem: Tandem ) {

    super( {

      // ScreenViewOptions
      isDisposable: false,
      tandem: tandem
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
    const lightNode = new LightNode( model.light, {
      left: this.layoutBounds.left + 100,
      bottom: 415,
      tandem: tandem.createTandem( 'lightNode' )
    } );

    // Controls for the light
    const lightControlPanel = new LightControlPanel( model.light, {
      left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      top: lightNode.bottom + 15,
      tandem: tandem.createTandem( 'lightControlPanel' )
    } );

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, {
      left: lightNode.right + 50,
      top: this.layoutBounds.top + 15,
      tandem: tandem.createTandem( 'zoomedInBoxNode' )
    } );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode( {
      centerX: lightNode.centerX,
      bottom: lightNode.top + 1,
      tandem: tandem.createTandem( 'boxOfHydrogenNode' )
    } );

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      right: boxOfHydrogenNode.right - 10,
      top: boxOfHydrogenNode.top + 20,
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // Dashed lines that connect the tiny box and zoom box
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( zoomedInBoxNode.left, zoomedInBoxNode.bottom ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineDash: [ 5, 5 ],
      visibleProperty: DerivedProperty.and( [ zoomedInBoxNode.visibleProperty, boxOfHydrogenNode.visibleProperty ] )
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
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, {
      left: lightControlPanel.right + 12,
      top: lightControlPanel.top,
      tandem: tandem.createTandem( 'spectrometerAccordionBox' )
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
        spectrometerAccordionBox.reset();
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
        lightNode,
        lightControlPanel,
        boxOfHydrogenNode,
        tinyBoxNode,
        dashedLines,
        zoomedInBoxNode,
        modelVBox,
        spectrometerAccordionBox,
        resetAllButton,
        popupsParent
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      //TODO pdomPlayAreaNode.pdomOrder
      lightNode,
      lightControlPanel,
      zoomedInBoxNode,
      modelVBox,
      timeControlNode,
      spectrometerAccordionBox,
      resetAllButton
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      //TODO pdomControlAreaNode.pdomOrder
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