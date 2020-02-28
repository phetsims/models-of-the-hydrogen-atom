// Copyright 2015-2020, University of Colorado Boulder

/**
 * ZoomBoxNode provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms, photons and alpha particles takes place.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

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

modelsOfTheHydrogenAtom.register( 'ZoomBoxNode', ZoomBoxNode );
export default ZoomBoxNode;