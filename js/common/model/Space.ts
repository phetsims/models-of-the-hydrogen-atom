// Copyright 2022, University of Colorado Boulder

/**
 * Space models the space that particles travel through.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import AlphaParticle from './AlphaParticle.js';
import Photon from './Photon.js';

export default class Space extends Bounds2 {

  constructor( minX: number, minY: number, maxX: number, maxY: number ) {
    super( minX, minY, maxX, maxY );
  }

  public containsPhoton( photon: Photon ): boolean {
    return this.containsPoint( photon.positionProperty.value );
  }

  public containsAlphaParticle( alphaParticle: AlphaParticle ): boolean {
    return this.containsPoint( alphaParticle.positionProperty.value );
  }
}

modelsOfTheHydrogenAtom.register( 'Space', Space );