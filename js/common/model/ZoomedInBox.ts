// Copyright 2022, University of Colorado Boulder

/**
 * ZoomedInBox is the part of the box of hydrogen that we're seeing in the zoomed-in view.
 * The box is square, and its origin (0,0) is at the center of the box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';

export default class ZoomedInBox extends Bounds2 {

  public constructor( size: number ) {
    super( -size / 2, -size / 2, size / 2, size / 2 );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public containsPhoton( photon: Photon ): boolean {
    return this.containsPoint( photon.positionProperty.value );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBox', ZoomedInBox );