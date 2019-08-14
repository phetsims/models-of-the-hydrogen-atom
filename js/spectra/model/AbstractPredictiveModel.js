// Copyright 2016-2019, University of Colorado Boulder

/**
 * AbstractPredictiveModel is the base class for all predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Emitter = require( 'AXON/Emitter' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const Vector2 = require( 'DOT/Vector2' );

  class AbstractPredictiveModel {

    /**
     * @param {Vector2} location - location in the model coordinate frame
     * @param {Object} [options]
     */
    constructor( location, options ) {

      options = _.extend( {
        orientation: 0, // {number} rotation angle, in radians
        numberOfStates: 0, // {number} number of electron states, not relevant to all hydrogen atom models
        groundState: 1 // {number} index of ground state, not relevant to all hydrogen atom models
      }, options );

      // @public (read-only)
      this.location = location;
      this.orientation = options.orientation;
      this.numberOfStates = options.numberOfStates;
      this.groundState = options.groundState;

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
      const x = photon.location.x + dx;
      const y = photon.location.y + dy;
      photon.locationProperty.value = new Vector2( x, y );
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
      const x = alphaParticle.location.x + dx;
      const y = alphaParticle.location.y + dy;
      alphaParticle.locationProperty.value = new Vector2( x, y );
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

  return modelsOfTheHydrogenAtom.register( 'AbstractPredictiveModel', AbstractPredictiveModel );
} );