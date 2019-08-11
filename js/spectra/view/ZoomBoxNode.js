// Copyright 2015-2016, University of Colorado Boulder

/**
 *
 * Provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms, photons and alpha particles takes place.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ZoomBoxNode( options ) {

    options = options || {};

    const outlineNode = new Rectangle( 0, 0, 400, 400, {
      fill: 'black',
      stroke: 'white',
      lineWidth: 1
    } );

    options.children = [ outlineNode ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'ZoomBoxNode', ZoomBoxNode );

  return inherit( Node, ZoomBoxNode );
} );
