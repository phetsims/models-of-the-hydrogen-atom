// Copyright 2016-2022, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import PredictionPanel from '../../common/view/PredictionPanel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import EnergyLevelsViewProperties from './EnergyLevelsViewProperties.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class EnergyLevelsScreenView extends ScreenView {

  public constructor( model: EnergyLevelsModel, providedOptions: EnergyLevelsScreenViewOptions ) {

    const options = optionize<EnergyLevelsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      //TODO default values for options
    }, providedOptions );

    super( options );

    const viewProperties = new EnergyLevelsViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( {
      expandedProperty: viewProperties.electronEnergyLevelExpandedProperty,
      center: this.layoutBounds.center,
      tandem: options.tandem.createTandem( 'electronEnergyLevelAccordionBox' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const predictionPanel = new PredictionPanel( model.predictiveModelProperty, model.predictiveModels,
      model.modelModeProperty, {
        left: electronEnergyLevelAccordionBox.right + 20,
        top: electronEnergyLevelAccordionBox.top,
        tandem: options.tandem.createTandem( 'predictionPanel' )
      } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override step( dt: number ): void {
    //TODO implement step
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );