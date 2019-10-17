// Copyright 2015-2019, University of Colorado Boulder

/**
 * ZoomBoxNode provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms, photons and alpha particles takes place.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  //TODO extends Rectangle?
  class ZoomBoxNode extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = merge( {}, options );

      const outlineNode = new Rectangle( 0, 0, 400, 400, {
        fill: MOTHAColorProfile.boxFillProperty,
        stroke: MOTHAColorProfile.boxStrokeProperty,
        lineWidth: 1
      } );

      assert && assert( !options.children, 'ZoomBoxNode sets children' );
      options.children = [ outlineNode ];

      super( options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ZoomBoxNode', ZoomBoxNode );
} );
