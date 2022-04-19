// Copyright 2016-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * PredictiveModel is the base class for all predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class PredictiveModel {

  /**
   * @param {string} displayName
   * @param {HTMLImageElement} icon
   * @param {Object} [options]
   */
  constructor( displayName, icon, options ) {
    assert && assert( typeof displayName === 'string', `invalid displayName: ${displayName}` );
    assert && assert( icon instanceof HTMLImageElement, `invalid icon: ${icon}` );

    options = merge( {
      position: Vector2.ZERO, // {Vector2} position in the model coordinate frame
      orientation: 0, // {number} rotation angle, in radians
      numberOfStates: 0, // {number} number of electron states, not relevant to all hydrogen atom models
      groundState: 1, // {number} index of ground state, not relevant to all hydrogen atom models
      hasTransitionWavelengths: false // does this model include the concept of transition wavelengths?
    }, options );

    // @public (read-only)
    this.displayName = displayName;
    this.icon = icon;
    this.position = options.position;
    this.orientation = options.orientation;
    this.numberOfStates = options.numberOfStates;
    this.groundState = options.groundState;
    this.hasTransitionWavelengths = options.hasTransitionWavelengths;

    //TODO add options.parameters
    // @public emit1 when a photon is absorbed
    this.photonAbsorbedEmitter = new Emitter();

    //TODO add options.parameters
    // @public emit1 when a photon is emitted (an unfortunate name)
    this.photonEmittedEmitter = new Emitter();
  }

  // @public
  dispose() {
    //TODO anything else? is this necessary?
    this.photonAbsorbedEmitter.removeAllListeners();
    this.photonEmittedEmitter.removeAllListeners();
  }

  /**
   * Called when time has advanced by some delta.
   * The default implementation does nothing.
   * @param {number} dt
   * @public
   */
  step( dt ) {
    //TODO @abstract?
  }

  /**
   * Gets the transition wavelengths for a specified state.
   * The default implementation returns null.
   * The notion of 'transition wavelength' does not apply to all
   * hydrogen atom models, but it is convenient to have it here.
   *
   * @param {number} state
   * @returns {number[]}
   * @public
   */
  getTransitionWavelengths( state ) {
    return null; //TODO @abstract?
  }

  /**
   * Moves a photon by the specified time step.
   * In this default implementation, the atom has no influence on the photon's movement.
   *
   * @param {Photon} photon
   * @param {number} dt
   * @public
   */
  stepPhoton( photon, dt ) {
    const distance = photon.speed * dt;
    const dx = Math.cos( photon.direction ) * distance;
    const dy = Math.sin( photon.direction ) * distance;
    const x = photon.position.x + dx;
    const y = photon.position.y + dy;
    photon.positionProperty.value = new Vector2( x, y );
  }

  /**
   * Moves an alpha particle by the specified time step.
   * In this default implementation, the atom has no influence on the alpha particle's movement.
   *
   * @param {AlphaParticle} alphaParticle
   * @param {number} dt
   * @public
   */
  stepAlphaParticle( alphaParticle, dt ) {
    const distance = alphaParticle.speed * dt;
    const dx = Math.cos( alphaParticle.direction ) * distance;
    const dy = Math.sin( alphaParticle.direction ) * distance;
    const x = alphaParticle.position.x + dx;
    const y = alphaParticle.position.y + dy;
    alphaParticle.positionProperty.value = new Vector2( x, y );
  }

  /**
   * Determines if two points collide.
   * Any distance between the points that is <= threshold is considered a collision.
   *
   * @param {Vector2} p1
   * @param {Vector2} p2
   * @param {number} threshold
   * @returns {boolean}
   * @protected
   */
  pointsCollide( p1, p2, threshold ) {
    return p1.distance( p2 ) <= threshold;
  }
}

modelsOfTheHydrogenAtom.register( 'PredictiveModel', PredictiveModel );
export default PredictiveModel;