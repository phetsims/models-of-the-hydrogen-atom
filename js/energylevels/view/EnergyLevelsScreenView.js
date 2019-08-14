// Copyright 2016-2019, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ElectronEnergyLevelAccordionBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/ElectronEnergyLevelAccordionBox' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAConstants = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAConstants' );
  const EnergyLevelsViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsViewProperties' );
  const PredictiveModelPanel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/PredictiveModelPanel' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

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

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );
} );