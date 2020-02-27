// Copyright 2015-2019, University of Colorado Boulder

/**
 * TinyBox indicates the portion of the box of hydrogen that is shown in the exploded view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

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

modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );
export default TinyBox;