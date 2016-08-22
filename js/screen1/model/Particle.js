// Copyright 2016, University of Colorado Boulder

/**
 * Base type for particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Vector2} location - location in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   * @constructor
   */
  function Particle( location, speed, direction ) {
    PropertySet.call( this, {
      location: location,
      speed: speed,
      direction: direction
    } );
  }

  modelsOfTheHydrogenAtom.register( 'Particle', Particle );

  return inherit( PropertySet, Particle );
} );
