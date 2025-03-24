// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHAScreenView is the base class for the ScreenView in both screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import BoxOfHydrogenNode from '../../common/view/BoxOfHydrogenNode.js';
import LegendPanel from '../../common/view/LegendPanel.js';
import MOTHATimeControlNode from '../../common/view/MOTHATimeControlNode.js';
import SpectrometerAccordionBox from '../../common/view/SpectrometerAccordionBox.js';
import TinyBox from '../../common/view/TinyBox.js';
import TransitionsDialog from '../../common/view/TransitionsDialog.js';
import ElectronEnergyLevelAccordionBox from '../../energylevels/view/ElectronEnergyLevelAccordionBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAModel from '../model/MOTHAModel.js';
import AtomicModelPanel from './AtomicModelPanel.js';
import ExperimentOopsDialog from './ExperimentOopsDialog.js';
import ModelOrExperimentSwitch from './ModelOrExperimentSwitch.js';
import { LightControlPanel } from './LightControlPanel.js';
import { LightSourceNode } from './LightSourceNode.js';
import SpectrometerSnapshotsDialog from './SpectrometerSnapshotsDialog.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';
import TransitionsButton from './TransitionsButton.js';

type SelfOptions = {

  // Parent Node for any popups.
  popupsParent: Node;

  // The zoomed-in view of the box of hydrogen.
  zoomedInBoxNode: ZoomedInBoxNode;

  // Optional accordion box with Electron Energy Level diagrams, present in the Energy Levels screen.
  // If provided, MOTHAScreenView will take responsibility for resetting.
  electronEnergyLevelAccordionBox?: ElectronEnergyLevelAccordionBox | null;

  // x-offset of lightNode from the left edge of layoutBounds.
  lightSourceNodeXOffset: number;

  // propagated to ModelPanel.
  atomicModelRadioButtonTextMaxWidth: number;

  // whether to add a 'Classical...Quantum' continuum bar
  hasContinuumBarNode?: boolean;

  // Description screen summary.
  screenSummaryContent: ScreenSummaryContent;
};

type MOTHAScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'>;

export default class MOTHAScreenView extends ScreenView {

  public static readonly X_MARGIN = 15;
  public static readonly Y_MARGIN = 15;

  private readonly model: MOTHAModel;

  // Box that shows the zoom-in view of the hydrogen atom.
  private readonly zoomedInBoxNode: ZoomedInBoxNode;

  // Optional accordion box that displays Electron Energy Level diagrams.
  private readonly electronEnergyLevelAccordionBox: ElectronEnergyLevelAccordionBox | null;

  protected constructor( model: MOTHAModel, providedOptions: MOTHAScreenViewOptions ) {

    const options = optionize<MOTHAScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // SelfOptions
      electronEnergyLevelAccordionBox: null,
      hasContinuumBarNode: true,

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
      model.lightSource.monochromaticWavelengthProperty, model.isQuantumAtomProperty, model.modelOrExperimentProperty,
      options.tandem.createTandem( 'lightControlPanel' ) );

    const transitionsDialog = new TransitionsDialog( model.lightSource.monochromaticWavelengthProperty,
      model.lightSource.lightModeProperty, model.modelOrExperimentProperty, model.isQuantumAtomProperty,
      this.visibleBoundsProperty, {
        tandem: options.tandem.createTandem( 'transitionsDialog' )
      } );

    const transitionsButton = new TransitionsButton( transitionsDialog, model.isQuantumAtomProperty,
      options.tandem.createTandem( 'transitionsButton' ) );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // Switches between Model and Experiment.
    const modelOrExperimentSwitch = new ModelOrExperimentSwitch( model.modelOrExperimentProperty,
      options.tandem.createTandem( 'modelOrExperimentSwitch' ) );

    const atomicModelPanel = new AtomicModelPanel( model.atomicModelProperty, model.atomicModels, model.modelOrExperimentProperty, {
      radioButtonTextMaxWidth: providedOptions.atomicModelRadioButtonTextMaxWidth,
      hasContinuumBarNode: providedOptions.hasContinuumBarNode,
      tandem: options.tandem.createTandem( 'atomicModelPanel' )
    } );

    // Spectrometer snapshots dialog
    const spectrometerSnapshotsDialog = new SpectrometerSnapshotsDialog( model.spectrometer,
      options.tandem.createTandem( 'spectrometerSnapshotsDialog' ) );

    // Spectrometer
    const spectrometerAccordionBox = new SpectrometerAccordionBox( model.spectrometer, spectrometerSnapshotsDialog,
      options.tandem.createTandem( 'spectrometerAccordionBox' ) );

    // Time controls
    const stepOnce = () => {
      model.stepOnce();
      this.stepOnce();
    };
    const timeControlNode = new MOTHATimeControlNode( model.isPlayingProperty, model.timeSpeedProperty, stepOnce,
      options.tandem.createTandem( 'timeControlNode' ) );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        transitionsDialog.reset();
        spectrometerAccordionBox.reset();
        spectrometerSnapshotsDialog.hide();
        this.electronEnergyLevelAccordionBox && this.electronEnergyLevelAccordionBox.reset();
      },
      right: this.layoutBounds.right - MOTHAScreenView.X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAScreenView.Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Workaround for joist deficiency that requires exactly 'black' and 'white' screen background color in order
    // to get the desired navigation bar color. This rectangle expands to fill the visible bounds of the ScreenView.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/96.
    const screenBackgroundRectangle = new Rectangle( 0, 0, 1, 1, {
      fill: MOTHAColors.screenBackgroundRectangleColorProperty
    } );
    this.visibleBoundsProperty.link( visibleBounds => screenBackgroundRectangle.setRectBounds( visibleBounds ) );

    // Dialog that opens when the Experiment's electron is stuck in the metastable state. Closing this dialog fires
    // an absorbable photon at the atom (similar to the 'Excite Electron' button for Schrödinger), which will cause
    // the electron to move to a higher state.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/105 for feature history.
    // See MetastableHandler.ts for more about the metastable state and how to test this dialog.
    const experiment = model.experiment;
    const experimentOopsDialog = new ExperimentOopsDialog( {
      hideCallback: () => {

        // While ExperimentOopsDialog is model, it's possible that PhET-iO may be used to change the sim state
        // while the dialog is open. So we need to check that the electron is still in the metastable state before
        // exciting it. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/109.
        if ( experiment.metastableHandler.isMetastableStateProperty.value ) {
          experiment.metastableHandler.exciteElectron();
        }
      },
      tandem: options.tandem.createTandem( 'experimentOopsDialog' )
    } );
    Multilink.multilink(
      [ model.modelOrExperimentProperty, experiment.metastableHandler.isMetastableStateProperty, model.lightSource.lightModeProperty ],
      ( modelOrExperiment, isMetastableState, lightMode ) => {
        if ( modelOrExperiment === 'experiment' && isMetastableState && lightMode === 'monochromatic' ) {
          experimentOopsDialog.show();
        }
      } );

    // Layout: zoomedInBoxNode and the elements to the left of it.
    lightSourceNode.left = this.layoutBounds.left + options.lightSourceNodeXOffset;
    this.zoomedInBoxNode.left = lightSourceNode.right + 50;
    this.zoomedInBoxNode.top = this.layoutBounds.top + MOTHAScreenView.Y_MARGIN;
    lightSourceNode.bottom = this.zoomedInBoxNode.bottom;
    boxOfHydrogenNode.centerX = lightSourceNode.centerX;
    boxOfHydrogenNode.bottom = lightSourceNode.top + 1;
    tinyBoxNode.left = boxOfHydrogenNode.right - boxOfHydrogenNode.width / 3;
    tinyBoxNode.centerY = boxOfHydrogenNode.centerY;

    // Layout: elements to the right of zoomedInBoxNode.
    const modelVBox = new VBox( {
      children: [ modelOrExperimentSwitch, atomicModelPanel ],
      align: 'center',
      spacing: 10
    } );

    // If modelOrExperimentSwitch is invisible, then we want atomicModelPanel to move up. Otherwise, we expect the
    // visibility of atomicModelPanel to change based on the modelOrExperimentSwitch setting, and we do not want
    // the switch to be shifting left/right. Note that for a period of time, this was failing assertion in Node
    // validateBounds which was addressed by removing the assertion, see
    // https://github.com/phetsims/models-of-the-hydrogen-atom/issues/108#issuecomment-2622765138
    modelOrExperimentSwitch.visibleProperty.link( visible => {
      modelVBox.excludeInvisibleChildrenFromBounds = !visible;
    } );

    // Layout involving electronEnergyLevelAccordionBox or lack thereof.
    const layoutEnergyLevelAccordionBox = ( electronEnergyLevelAccordionBox?: Node ) => {
      if ( electronEnergyLevelAccordionBox ) {
        electronEnergyLevelAccordionBox.left = this.zoomedInBoxNode.right + 10;
        electronEnergyLevelAccordionBox.top = this.zoomedInBoxNode.top;
        modelVBox.left = electronEnergyLevelAccordionBox.right + 10;
        modelVBox.top = electronEnergyLevelAccordionBox.top;
        timeControlNode.left = electronEnergyLevelAccordionBox.right + 15;
        timeControlNode.bottom = this.zoomedInBoxNode.bottom;
      }
      else {
        const left = this.zoomedInBoxNode.right + 30;
        modelVBox.left = left;
        modelVBox.top = this.zoomedInBoxNode.top;
        timeControlNode.left = left;
        timeControlNode.bottom = this.zoomedInBoxNode.bottom;
      }
    };

    if ( this.electronEnergyLevelAccordionBox ) {

      // If provided with electronEnergyLevelAccordionBox, it's possible that it may be hidden via PhET-iO,
      // and that requires a layout as if electronEnergyLevelAccordionBox did not exist.
      this.electronEnergyLevelAccordionBox.visibleProperty.link( visible =>
        visible ? layoutEnergyLevelAccordionBox( this.electronEnergyLevelAccordionBox! ) : layoutEnergyLevelAccordionBox() );
    }
    else {
      layoutEnergyLevelAccordionBox();
    }

    // Layout: elements below zoomedInBoxNode.
    const bottomHBox = new HBox( {
      align: 'top',
      spacing: 12,
      children: [
        new VBox( {
          excludeInvisibleChildrenFromBounds: false,
          align: 'center',
          spacing: 5,
          children: [ lightControlPanel, transitionsButton ]
        } ),
        spectrometerAccordionBox
      ],
      left: this.layoutBounds.left + MOTHAScreenView.X_MARGIN,
      top: this.zoomedInBoxNode.bottom + 15
    } );

    // Layout: miscellaneous elements
    transitionsDialog.setInitialPosition( modelVBox.leftTop );
    legendPanel.left = this.layoutBounds.left + MOTHAScreenView.X_MARGIN;
    legendPanel.top = this.layoutBounds.top + MOTHAScreenView.Y_MARGIN;
    resetAllButton.right = this.layoutBounds.right - MOTHAScreenView.X_MARGIN;
    resetAllButton.bottom = this.layoutBounds.bottom - MOTHAScreenView.Y_MARGIN;

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
      modelVBox,
      bottomHBox,
      resetAllButton,
      transitionsDialog,
      options.popupsParent
    ];

    // Add optional electronEnergyLevelAccordionBox before resetAllButton.
    if ( this.electronEnergyLevelAccordionBox ) {
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
      transitionsButton,
      transitionsDialog,
      modelVBox,
      this.zoomedInBoxNode
    ];

    // Add optional electronEnergyLevelAccordionBox before modelBox.
    if ( this.electronEnergyLevelAccordionBox ) {
      const index = playAreaPDOMOrder.indexOf( modelVBox );
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

  /**
   * Steps the view when the sim is playing.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.stepOnce( dt );
    }
  }

  /**
   * Steps the view by one time step.
   * @param dt - time step, in seconds
   */
  private stepOnce( dt = MOTHAModel.STEP_ONCE_NORMAL_DT ): void {
    this.zoomedInBoxNode.step( dt );
    this.electronEnergyLevelAccordionBox && this.electronEnergyLevelAccordionBox.step( dt );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAScreenView', MOTHAScreenView );