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
import AtomicModelPanel from './AtomicModelPanel.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import ExperimentOopsDialog from './ExperimentOopsDialog.js';

type SelfOptions = {

  // Parent Node for any popups.
  popupsParent: Node;

  // The zoomed-in view of the box of hydrogen.
  zoomedInBoxNode: ZoomedInBoxNode;

  // Optional accordion box with Electron Energy Level diagrams, present in the Energy Levels screen.
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

  private readonly model: MOTHAModel;
  private readonly zoomedInBoxNode: ZoomedInBoxNode;
  private readonly electronEnergyLevelAccordionBox: ElectronEnergyLevelAccordionBox | null;
  private readonly resetAllMOTHAScreenView: () => void;

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
      model.lightSource.monochromaticWavelengthProperty, model.isQuantumModelProperty, model.isExperimentProperty,
      options.tandem.createTandem( 'lightControlPanel' ) );

    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/106 for the design of transitionsIsCheckedProperty.
    const transitionsIsCheckedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'transitionsIsCheckedProperty' ),
      phetioDocumentation: 'Whether the Transitions checkbox is checked. Setting this to true shows transitionsDialog only for quantum atomic models.',
      phetioFeatured: true, // see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/106#issuecomment-2617048461
      phetioReadOnly: true // see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/106#issuecomment-2616678607
    } );

    const transitionsCheckbox = new TransitionsCheckbox( transitionsIsCheckedProperty,
      model.isQuantumModelProperty, options.tandem.createTandem( 'transitionsCheckbox' ) );

    // Uncheck the Transitions checkbox when we switch to a classical model.
    model.isQuantumModelProperty.link( isQuantumModel => {
      if ( !isSettingPhetioStateProperty.value && !isQuantumModel && transitionsIsCheckedProperty.value ) {
        transitionsIsCheckedProperty.value = false;
      }
    } );

    const transitionsDialog = new TransitionsDialog( model.lightSource.monochromaticWavelengthProperty,
      model.lightSource.lightModeProperty, model.isExperimentProperty, transitionsIsCheckedProperty,
      model.isQuantumModelProperty, this.visibleBoundsProperty, {
        tandem: options.tandem.createTandem( 'transitionsDialog' )
      } );

    // Box of hydrogen
    const boxOfHydrogenNode = new BoxOfHydrogenNode();

    // Tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      visibleProperty: boxOfHydrogenNode.visibleProperty
    } );

    // switches the model mode between Experiment and Model
    const experimentModelSwitch = new ExperimentModelSwitch( model.isExperimentProperty,
      options.tandem.createTandem( 'experimentModelSwitch' ) );

    const atomicModelPanel = new AtomicModelPanel( model.atomicModelProperty, model.atomicModels,
      model.isExperimentProperty, {
        radioButtonTextMaxWidth: providedOptions.atomicModelRadioButtonTextMaxWidth,
        hasContinuumBarNode: providedOptions.hasContinuumBarNode,
        tandem: options.tandem.createTandem( 'atomicModelPanel' )
      } );

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
    // to get the desired navigation bar color. This rectangle expands to fill the visible bounds of the ScreenView.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/96.
    const screenBackgroundRectangle = new Rectangle( 0, 0, 1, 1, {
      fill: MOTHAColors.screenBackgroundRectangleColorProperty
    } );
    this.visibleBoundsProperty.link( visibleBounds => screenBackgroundRectangle.setRectBounds( visibleBounds ) );

    // Dialog that opens when the Experiment's electron is stuck in the metastable state. Closing this dialog fires
    // an absorbable photon at the atom (similar to the 'Excite Atom' button for Schrodinger), which will cause the
    // electron to move to a higher state.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/105 for feature history.
    // To test:
    // * Run with ?dev&showHalos. dev will show the (n,l,m) state display, and showHalos will draw a halo around
    //   the absorbable photon, making it easier to see.
    // * Set time speed to 'Fast', so that you'll get to the metastable state faster.
    // * Set the A/B switch to 'Experiment'.
    // * Set the light source to set to 'Monochromatic' 94 nm.
    // * Turn on the light source.
    // * Then wait for the electron to get stuck in the metastable state, and verify that this dialog opens.
    // * Close this dialog, observe that an absorbable photon is fired at the atom, and the electron moves to
    //   a higher state.
    const experimentOopsDialog = new ExperimentOopsDialog( {
      hideCallback: () => model.experiment.excite(),
      tandem: options.tandem.createTandem( 'experimentOopsDialog' )
    } );
    Multilink.multilink(
      [ model.isExperimentProperty, model.experiment.metastableHandler.isMetastableStateProperty, model.lightSource.lightModeProperty ],
      ( isExperiment, isMetastableState, lightMode ) => {
        if ( isExperiment && isMetastableState && lightMode === 'monochromatic' ) {
          experimentOopsDialog.show();
        }
      } );

    // Layout: zoomedInBoxNode and the elements to the left of it.
    lightSourceNode.left = this.layoutBounds.left + options.lightSourceNodeXOffset;
    this.zoomedInBoxNode.left = lightSourceNode.right + 50;
    this.zoomedInBoxNode.top = this.layoutBounds.top + MOTHAConstants.SCREEN_VIEW_Y_MARGIN;
    lightSourceNode.bottom = this.zoomedInBoxNode.bottom;
    boxOfHydrogenNode.centerX = lightSourceNode.centerX;
    boxOfHydrogenNode.bottom = lightSourceNode.top + 1;
    tinyBoxNode.left = boxOfHydrogenNode.right - boxOfHydrogenNode.width / 3;
    tinyBoxNode.centerY = boxOfHydrogenNode.centerY;

    // Layout: elements to the right of zoomedInBoxNode.
    timeControlNode.bottom = this.zoomedInBoxNode.bottom;

    const modelVBox = new VBox( {
      children: [ experimentModelSwitch, atomicModelPanel ],
      align: 'center',
      spacing: 10
    } );

    // If experimentModelSwitch is invisible, then we want atomicModelPanel to move up. Otherwise, we expect the
    // visibility of atomicModelPanel to change based on the experimentModelSwitch setting, and we do not want
    // the switch to be shifting left/right.
    experimentModelSwitch.visibleProperty.link( visible => {
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
      }
      else {
        const left = this.zoomedInBoxNode.right + 30;
        modelVBox.left = left;
        modelVBox.top = this.zoomedInBoxNode.top;
        timeControlNode.left = left;
      }
    };

    if ( this.electronEnergyLevelAccordionBox ) {

      // If provided with electronEnergyLevelAccordionBox, it's possible that it may be permanently hidden via PhET-iO,
      // and that requires a layout as if electronEnergyLevelAccordionBox did not exist.
      this.electronEnergyLevelAccordionBox.gatedVisibleProperty.selfBooleanProperty.link( gatedVisible =>
        gatedVisible ? layoutEnergyLevelAccordionBox( this.electronEnergyLevelAccordionBox! ) : layoutEnergyLevelAccordionBox() );
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
          children: [ lightControlPanel, transitionsCheckbox ]
        } ),
        spectrometerAccordionBox
      ],
      left: this.layoutBounds.left + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      top: this.zoomedInBoxNode.bottom + 15
    } );

    // Layout: miscellaneous elements
    transitionsDialog.setInitialPosition( modelVBox.leftTop );
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
      modelVBox,
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
      modelVBox,
      this.zoomedInBoxNode
    ];
    if ( this.electronEnergyLevelAccordionBox ) {
      // Add optional electronEnergyLevelAccordionBox before modelBox.
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