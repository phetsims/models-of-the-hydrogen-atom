// Copyright 2022, University of Colorado Boulder

/**
 * ZoomedInBox is the part of the box of hydrogen that we're seeing in the zoomed-in view.
 * The origin (0,0) is at the center.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import AlphaParticle from './AlphaParticle.js';
import Photon from './Photon.js';

export default class ZoomedInBox extends Bounds2 {

  constructor( size: Dimension2 ) {
    super( -size.width / 2, -size.height / 2, size.width / 2, size.height / 2 );
  }

  public containsPhoton( photon: Photon ): boolean {
    return this.containsPoint( photon.positionProperty.value );
  }

  public containsAlphaParticle( alphaParticle: AlphaParticle ): boolean {
    return this.containsPoint( alphaParticle.positionProperty.value );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBox', ZoomedInBox );