// Copyright 2016, University of Colorado Boulder

/**
 * View for 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {EnergyLevelsModel} model
   * @constructor
   */
  function EnergyLevelsScreenView( model ) {

    ScreenView.call( this );
    
    //TODO
  }

  modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );

  return inherit( ScreenView, EnergyLevelsScreenView, {

    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );