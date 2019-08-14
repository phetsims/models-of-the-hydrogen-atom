// Copyright 2019, University of Colorado Boulder

/**
 * MOTHAScreen is the base class for all Screens in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Screen = require( 'JOIST/Screen' );

  class MOTHAScreen extends Screen {

    /**
     * @param {function: Object} createModel
     * @param {function( model:Object ): ScreenView } createView
     * @param {Object} [options]
     */
    constructor( createModel, createView, options ) {
      assert && assert( typeof createModel === 'function', `invalid createModel: ${createModel}` );
      assert && assert( typeof createView === 'function', `invalid createView: ${createView}` );

      options = _.extend( {

        // superclass options
        backgroundColorProperty: MOTHAColorProfile.screenBackgroundColorProperty,

        // put a gray border around unselected icons on the home screen
        showUnselectedHomeScreenIconFrame: true,

        // put a gray border around screen icons when the navigation bar is black
        showScreenIconFrameForNavigationBarFill: 'black'
      }, options );

      super( createModel, createView, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );
} );