// Copyright 2016-2023, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import PredictionPanel from '../../common/view/PredictionPanel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import EnergyLevelsViewProperties from './EnergyLevelsViewProperties.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class EnergyLevelsScreenView extends ScreenView {

  public constructor( model: EnergyLevelsModel, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem
    } );

    const viewProperties = new EnergyLevelsViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( {
      expandedProperty: viewProperties.electronEnergyLevelExpandedProperty,
      center: this.layoutBounds.center,
      tandem: tandem.createTandem( 'electronEnergyLevelAccordionBox' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const predictionPanel = new PredictionPanel( model.predictiveModelProperty, model.predictiveModels,
      model.modelModeProperty, {
        left: electronEnergyLevelAccordionBox.right + 20,
        top: electronEnergyLevelAccordionBox.top,
        tandem: tandem.createTandem( 'predictionPanel' )
      } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
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
        electronEnergyLevelAccordionBox,
        predictionPanel,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // pdom - traversal order
    screenViewRootNode.pdomOrder = [
      electronEnergyLevelAccordionBox,
      predictionPanel,
      resetAllButton
    ];
  }

  public override step( dt: number ): void {
    //TODO implement step
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );