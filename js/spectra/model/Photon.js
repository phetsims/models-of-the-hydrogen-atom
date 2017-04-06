// Copyright 2016, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 * A photon has a wavelength, location and direction of motion.
 * Photons move with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAColors = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColors' );
  var Particle = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/Particle' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {number} wavelength - the photon's immutable wavelength
   * @param {Vector2} location - location in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   * @param {Object} [options]
   * @constructor
   */
  function Photon( wavelength, location, speed, direction, options ) {

    options = _.extend( {
      emitted: false, // {boolean} was this photon emitted by the atom?
      collided: false // {boolean} did this photon already collide with the atom?
    }, options );

    this.wavelength = wavelength; // @public (read-only)
    this.emitted = options.emitted; // @public (read-only)
    this.collided = options.collided; // @public

    Particle.call( this, location, speed, direction );
  }

  modelsOfTheHydrogenAtom.register( 'Photon', Photon );

  return inherit( Particle, Photon, {

    /**
     * Gets the Color associated with the photon's wavelength.
     * @returns {Color}
     */
    getColor: function() {
      return VisibleColor.wavelengthToColor( this.wavelength, {
        uvColor: MOTHAColors.UV_COLOR,
        irColor: MOTHAColors.IR_COLOR
      } );
    }
  } );
} );