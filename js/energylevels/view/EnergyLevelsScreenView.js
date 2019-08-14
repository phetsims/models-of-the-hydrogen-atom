// Copyright 2016-2019, University of Colorado Boulder

/**
 * View for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ElectronEnergyLevelAccordionBox = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/ElectronEnergyLevelAccordionBox' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAConstants = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAConstants' );
  const MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MOTHAViewProperties' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

  class EnergyLevelsScreenView extends ScreenView {

    /**
     * @param {EnergyLevelsModel} model
     */
    constructor( model ) {

      super();

      const viewProperties = new MOTHAViewProperties();

      const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( viewProperties.electronEnergyLevelExpandedProperty, {
        center: this.layoutBounds.center
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