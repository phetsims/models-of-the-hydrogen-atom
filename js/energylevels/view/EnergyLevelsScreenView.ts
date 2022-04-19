// Copyright 2016-2020, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import PredictiveModelPanel from '../../common/view/PredictiveModelPanel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import EnergyLevelsViewProperties from './EnergyLevelsViewProperties.js';

type SelfOptions = {};

type EnergyLevelsScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class EnergyLevelsScreenView extends ScreenView {

  constructor( model: EnergyLevelsModel, providedOptions: EnergyLevelsScreenViewOptions ) {

    const options = optionize<EnergyLevelsScreenViewOptions, SelfOptions, ScreenViewOptions, 'tandem'>( {
      //TODO
    }, providedOptions );

    super( options );

    const viewProperties = new EnergyLevelsViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( viewProperties.electronEnergyLevelExpandedProperty, {
      center: this.layoutBounds.center,
      tandem: options.tandem.createTandem( 'electronEnergyLevelAccordionBox' )
    } );

    // panel that contains radio buttons for selecting a predictive model
    const predictiveModelPanel = new PredictiveModelPanel( model.predictiveModelProperty, model.predictiveModels, {
      left: electronEnergyLevelAccordionBox.right + 20,
      top: electronEnergyLevelAccordionBox.top,
      tandem: options.tandem.createTandem( 'predictiveModelPanel' )
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

    //TODO add other UI components

    // rendering order
    this.addChild( electronEnergyLevelAccordionBox );
    this.addChild( predictiveModelPanel );
    this.addChild( resetAllButton );
  }

  public step( dt: number ): void {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );