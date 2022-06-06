// Copyright 2022, University of Colorado Boulder

/**
 * RutherfordScattering is responsible for moving alpha particles, under the influence of a hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import AlphaParticle from './AlphaParticle.js';
import HydrogenAtom from './HydrogenAtom.js';
import PlumPuddingModel from './PlumPuddingModel.js';
import ZoomedInBox from './ZoomedInBox.js';

// Value of x used when x === 0 (this algorithm fails when x === 0)
const X_MIN = 0.01;

const RutherfordScattering = {

  /**
   * Moves an alpha particle under the influence of a hydrogen atom.
   *
   * This algorithm computes particle trajectories for Plum Pudding, Bohr, deBroglie and Schrodinger hydrogen-atom
   * models. The only difference between models is the value of the constant D. This algorithm was specified by
   * Sam McKagan in "Trajectories for Rutherford Scattering", which can be found at
   * doc/Trajectories_for_Rutherford_Scattering.pdf.
   *
   * ASSUMPTIONS MADE IN THIS ALGORITHM:
   * (1) The atom is located at (0,0), so calculations are done relative to the atom's position.
   * (2) Particles are moving from bottom to top of zoomedInBox, in +y direction.
   * (3) x values are non-negative. The algorithm fails for negative values of x. This is not mentioned in the specification
   * document. Our x values may be negative, so we must convert to non-negative values of x, then convert back.
   * (4) Using "phi=arctan(-x,y)" as described in the specification causes particles to jump discontinuously when they
   * go above the y-axis. This is fixed by using Math.atan2 instead.
   *
   * @param hydrogenAtom
   * @param alphaParticle
   * @param zoomedInBox - the zoomed-in part of the box of hydrogen, where animation takes place
   * @param dt - the time step, in seconds
   */
  moveParticle( hydrogenAtom: HydrogenAtom, alphaParticle: AlphaParticle, zoomedInBox: ZoomedInBox, dt: number ): void {
    assert && assert( dt > 0 );

    const D = getD( hydrogenAtom, alphaParticle, zoomedInBox );

    // particle's initial position, relative to the atom's center.
    const x0 = getX0( hydrogenAtom, alphaParticle );
    assert && assert( x0 > 0 );
    const y0 = alphaParticle.positionProperty.initialValue.y - hydrogenAtom.position.y;

    // b, horizontal distance to atom's center at y == negative infinity
    const b1 = Math.sqrt( ( x0 * x0 ) + ( y0 * y0 ) );
    const b = 0.5 * ( x0 + Math.sqrt( ( -2 * D * b1 ) - ( 2 * D * y0 ) + ( x0 * x0 ) ) );
    assert && assert( b > 0 );

    // particle's current position (relative to atom) and speed
    let x = alphaParticle.positionProperty.value.x - hydrogenAtom.position.x;
    const y = alphaParticle.positionProperty.value.y - hydrogenAtom.position.y;
    const v = alphaParticle.speedProperty.value;
    const v0 = alphaParticle.speedProperty.initialValue;

    // This algorithm fails for x < 0, so adjust accordingly.
    const xSign = ( x < 0 ) ? -1 : 1;
    x *= xSign;
    assert && assert( x >= 0 );

    // Convert the particle's current position to Polar coordinates.
    const r = Math.sqrt( ( x * x ) + ( y * y ) );
    const phi = Math.atan2( x, -y );

    // Compute the new position (in Polar coordinates) and speed.
    const t1 = ( ( b * Math.cos( phi ) ) - ( ( D / 2 ) * Math.sin( phi ) ) );
    const phiNew = phi + ( ( b * b * v * dt ) / ( r * Math.sqrt( Math.pow( b, 4 ) + ( r * r * t1 * t1 ) ) ) );
    const rNew = Math.abs( ( b * b ) / ( ( b * Math.sin( phiNew ) ) + ( ( D / 2 ) * ( Math.cos( phiNew ) - 1 ) ) ) );
    const vNew = v0 * Math.sqrt( 1 - ( D / rNew ) );

    // Convert the new position to Cartesian coordinates.
    let xNew = rNew * Math.sin( phiNew );
    let yNew = -rNew * Math.cos( phiNew );

    // Adjust the sign of x.
    xNew *= xSign;

    // Adjust for atom position.
    xNew += hydrogenAtom.position.x;
    yNew += hydrogenAtom.position.y;

    // Update the particle.
    alphaParticle.positionProperty.value = new Vector2( xNew, yNew );
    alphaParticle.speedProperty.value = vNew;
    alphaParticle.directionProperty.value = phiNew;
  }
};

/**
 * Gets the value x0. This value must be > 0, and is adjusted accordingly.
 */
function getX0( hydrogenAtom: HydrogenAtom, alphaParticle: AlphaParticle ) {

  let x0 = Math.abs( alphaParticle.positionProperty.getInitialValue().x - hydrogenAtom.position.x );
  if ( x0 === 0 ) {
    x0 = X_MIN;
  }
  return x0;
}

/*
 * Gets the constant D.
 */
function getD( hydrogenAtom: HydrogenAtom, alphaParticle: AlphaParticle, zoomedInBoxSize: ZoomedInBox ) {
  let D = 0;
  const L = zoomedInBoxSize.height;
  const DB = L / 16;
  if ( hydrogenAtom instanceof PlumPuddingModel ) {
    const plumPuddingAtom = hydrogenAtom as PlumPuddingModel;
    const x0 = getX0( plumPuddingAtom, alphaParticle );
    const R = plumPuddingAtom.radius;
    D = ( x0 <= R ) ? ( ( DB * x0 * x0 ) / ( R * R ) ) : DB;
  }
  else {
    D = DB;
  }
  return D;
}

modelsOfTheHydrogenAtom.register( 'RutherfordScattering', RutherfordScattering );
export default RutherfordScattering;