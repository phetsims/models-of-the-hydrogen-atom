// Copyright 2015-2021, University of Colorado Boulder

// @ts-nocheck
//TODO white beam is not visible on white background in projector mode
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class BeamNode extends Rectangle {

  /**
   * @param {Property.<boolean>} visibleProperty - is the beam visible?
   * @param {Property.<Color|string>} colorProperty - the beam's color
   * @param {Object} [options]
   */
  constructor( visibleProperty, colorProperty, options ) {

    options = merge( {
      beamSize: new Dimension2( 10, 50 )
    }, options );

    super( 0, 0, options.beamSize.width, options.beamSize.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
    colorProperty.linkAttribute( this, 'fill' );
  }
}

modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );
export default BeamNode;