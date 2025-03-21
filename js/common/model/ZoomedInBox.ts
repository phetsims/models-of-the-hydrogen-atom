// Copyright 2022-2025, University of Colorado Boulder

/**
 * ZoomedInBox is the part of the box of hydrogen that we're seeing in the zoomed-in view.
 * The box is square, and its origin (0,0) is at the center of the box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';

export default class ZoomedInBox {

  // Length of one side of the box, which is square, in model coordinates.
  // This value is the same as the Java version, to preserve the same relative sizes of things in the model.
  // This constant was ANIMATION_BOX_SIZE in HAConstants.java.
  public static readonly SIDE_LENGTH = 475;

  // Bounds of the zoomed-in box, with origin (0,0) at the center of these bounds.
  public readonly bounds: Bounds2;

  public constructor() {
    const apothem = ZoomedInBox.SIDE_LENGTH / 2;
    this.bounds = new Bounds2( -apothem, -apothem, apothem, apothem );
  }

  /**
   * Whether the box contains the specified photon.
   */
  public containsPhoton( photon: Photon ): boolean {
    return this.bounds.containsPoint( photon.positionProperty.value );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBox', ZoomedInBox );