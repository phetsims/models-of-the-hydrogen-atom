// Copyright 2016, University of Colorado Boulder

/**
 * View for 'TODO' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {Screen2Model} model
   * @constructor
   */
  function Screen2View( model ) {

    ScreenView.call( this );
    
    //TODO
  }

  modelsOfTheHydrogenAtom.register( 'Screen2View', Screen2View );

  return inherit( ScreenView, Screen2View, {

    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );