// Copyright 2015-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * ElectronNode is the visual representation of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 9;

class ElectronNode extends ShadedSphereNode {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.mainColor = 'rgb( 120, 120, 255 )';
    options.highlightColor = 'rgb( 140, 140, 255 )';

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );
export default ElectronNode;