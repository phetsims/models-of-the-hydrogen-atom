// Copyright 2016, University of Colorado Boulder

/**
 * Base type for all hydrogen atom models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} location - location in the model coordinate frame
   * @param {Object} [options]
   * @constructor
   */
  function AbstractHydrogenAtom( location, options ) {

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

    // @public emit1 when a photon is absorbed
    this.photonAbsorbedEmitter = new Emitter();

    // @public emit1 when a photon is emitted (an unfortunate name)
    this.photonEmittedEmitter = new Emitter();
  }

  modelsOfTheHydrogenAtom.register( 'AbstractHydrogenAtom', AbstractHydrogenAtom );

  return inherit( Object, AbstractHydrogenAtom, {

    // @public
    dispose: function() {
      //TODO anything else? is this necessary?
      this.photonAbsorbedEmitter.removeAllListeners();
      this.photonEmittedEmitter.removeAllListeners();
    },

    /**
     * Called when time has advanced by some delta.
     * The default implementation does nothing.
     *
     * @param {number} dt
     * @public
     */
    step: function( dt ) {},

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
    getTransitionWavelengths: function( state ) {
      return null;
    },

    /**
     * Moves a photon by the specified time step.
     * In this default implementation, the atom has no influence on the photon's movement.
     *
     * @param {Photon} photon
     * @param {number} dt
     * @public
     */
    stepPhoton: function( photon, dt ) {
      var distance = photon.speed * dt;
      var dx = Math.cos( photon.direction ) * distance;
      var dy = Math.sin( photon.direction ) * distance;
      var x = photon.location.x + dx;
      var y = photon.location.y + dy;
      photon.locationProperty.set( new Vector2( x, y ) );
    },

    /**
     * Moves an alpha particle by the specified time step.
     * In this default implementation, the atom has no influence on the alpha particle's movement.
     *
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @public
     */
    stepAlphaParticle: function( alphaParticle, dt ) {
      var distance = alphaParticle.speed * dt;
      var dx = Math.cos( alphaParticle.direction ) * distance;
      var dy = Math.sin( alphaParticle.direction ) * distance;
      var x = alphaParticle.location.x + dx;
      var y = alphaParticle.location.y + dy;
      alphaParticle.locationProperty.set( new Vector2( x, y ) );
    },

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
    pointsCollide: function( p1, p2, threshold ) {
      return p1.distance( p2 ) <= threshold;
    }
  } );
} );