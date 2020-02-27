// Copyright 2016-2019, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import PredictiveModelPanel from '../../common/view/PredictiveModelPanel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import EnergyLevelsViewProperties from './EnergyLevelsViewProperties.js';

class EnergyLevelsScreenView extends ScreenView {

  /**
   * @param {EnergyLevelsModel} model
   */
  constructor( model ) {

    super();

    const viewProperties = new EnergyLevelsViewProperties();

    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( viewProperties.electronEnergyLevelExpandedProperty, {
      center: this.layoutBounds.center
    } );

    // panel that contains radio buttons for selecting a predictive model
    const predictiveModelPanel = new PredictiveModelPanel( model.predictiveModelProperty, model.predictiveModels, {
      top: electronEnergyLevelAccordionBox.top,
      left: electronEnergyLevelAccordionBox.right + 20
    } );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.right - MOTHAConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - MOTHAConstants.SCREEN_VIEW_Y_MARGIN
    } );

    //TODO add other UI components

    // rendering order
    this.addChild( electronEnergyLevelAccordionBox );
    this.addChild( predictiveModelPanel );
    this.addChild( resetAllButton );
  }

  /**
   * @param {number} dt
   * @public
   */
  step( dt ) {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );
export default EnergyLevelsScreenView;