// Copyright 2016-2024, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import ModelPanel from '../../common/view/ModelPanel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

export default class EnergyLevelsScreenView extends ScreenView {

  public constructor( model: EnergyLevelsModel, tandem: Tandem ) {

    super( {

      // ScreenViewOptions
      isDisposable: false,

      //TODO https://github.com/phetsims/joist/issues/987 change this to ScreenSummaryContent
      screenSummaryContent: new Node( {
        tagName: 'p',
        innerContent: ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreenSummaryStringProperty
      } ),
      tandem: tandem
    } );

    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( {
      center: this.layoutBounds.center,
      tandem: tandem.createTandem( 'electronEnergyLevelAccordionBox' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const modelPanel = new ModelPanel( model.predictiveModelProperty, model.predictiveModels, model.isExperimentProperty, {
      hasContinuumBar: false,
      left: electronEnergyLevelAccordionBox.right + 20,
      top: electronEnergyLevelAccordionBox.top,
      tandem: tandem.createTandem( 'modelPanel' )
    } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        electronEnergyLevelAccordionBox.reset();
      },
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // rendering order
    const screenViewRootNode = new Node( {
      children: [
        electronEnergyLevelAccordionBox,
        modelPanel,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      //TODO pdomPlayAreaNode.pdomOrder
      electronEnergyLevelAccordionBox,
      modelPanel,
      resetAllButton
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      //TODO pdomControlAreaNode.pdomOrder
    ];
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );