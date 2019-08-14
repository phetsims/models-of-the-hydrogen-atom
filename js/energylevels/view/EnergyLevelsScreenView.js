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
  const MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/MOTHAViewProperties' );
  const ScreenView = require( 'JOIST/ScreenView' );

  class EnergyLevelsScreenView extends ScreenView {

    /**
     * @param {EnergyLevelsModel} model
     */
    constructor( model ) {

      super();

      const viewProperties = new MOTHAViewProperties();

      this.addChild( new ElectronEnergyLevelAccordionBox( viewProperties.electronEnergyLevelExpandedProperty, {
        center: this.layoutBounds.center
      } ) );

      //TODO
    }

    /**
     * @param {number} dt
     * @public
     */
    step( dt ) {
      //TODO Handle view animation here.
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );
} );