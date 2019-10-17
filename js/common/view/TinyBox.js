// Copyright 2015-2019, University of Colorado Boulder

/**
 * TinyBox indicates the portion of the box of hydrogen that is shown in the exploded view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  const TINY_BOX_SIZE = new Dimension2( 6, 6 );

  class TinyBox extends Rectangle {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = merge( {
        fill: MOTHAColorProfile.boxFillProperty,
        stroke: MOTHAColorProfile.boxStrokeProperty,
        lineWidth: 2
      }, options );

      super( 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );
} );
