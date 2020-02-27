// Copyright 2015-2019, University of Colorado Boulder

/**
 * ProtonNode is the visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 11;

class ProtonNode extends ShadedSphereNode {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.mainColor = PhetColorScheme.RED_COLORBLIND;
    options.highlightColor = 'rgb( 255, 130, 130 )'; // lighter red

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );
export default ProtonNode;