// Copyright 2015-2020, University of Colorado Boulder

/**
 * NeutronNode is the visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 11;

class NeutronNode extends ShadedSphereNode {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.mainColor = 'rgb( 128, 128, 128 )';
    options.highlightColor = 'rgb( 175, 175, 175 )';

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );
export default NeutronNode;