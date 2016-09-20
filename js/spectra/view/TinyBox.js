// Copyright 2015-2016, University of Colorado Boulder

/**
 * Indicates the portion of the box of hydrogen that is shown in the exploded view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var TINY_BOX_SIZE = new Dimension2( 6, 6 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function TinyBox( options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2
    }, options );

    Rectangle.call( this, 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
  }

  modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );

  return inherit( Rectangle, TinyBox );
} );
