// Copyright 2019-2020, University of Colorado Boulder

/**
 * MOTHAScreen is the base class for all Screens in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../../joist/js/Screen.js';
import merge from '../../../../phet-core/js/merge.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

class MOTHAScreen extends Screen {

  /**
   * @param {function: Object} createModel
   * @param {function( model:Object ): ScreenView } createView
   * @param {Object} [options]
   */
  constructor( createModel, createView, options ) {
    assert && assert( typeof createModel === 'function', `invalid createModel: ${createModel}` );
    assert && assert( typeof createView === 'function', `invalid createView: ${createView}` );

    options = merge( {

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

modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );
export default MOTHAScreen;