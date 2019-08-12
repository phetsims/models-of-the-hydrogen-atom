// Copyright 2016-2019, University of Colorado Boulder

/**
 * View for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ScreenView = require( 'JOIST/ScreenView' );

  class EnergyLevelsScreenView extends ScreenView {

    /**
     * @param {EnergyLevelsModel} model
     */
    constructor( model ) {

      super();

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