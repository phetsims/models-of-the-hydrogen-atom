// Copyright 2016-2020, University of Colorado Boulder

/**
 * Particle is the base class for particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );

  class Particle {

    /**
     * @param {Vector2} position - position in model coordinate frame
     * @param {number} speed - distance per dt
     * @param {number} direction - direction of motion, in radians
     */
    constructor( position, speed, direction ) {

      // @public
      this.positionProperty = new Property( position );
      this.speedProperty = new NumberProperty( speed );
      this.directionProperty = new NumberProperty( direction );
    }

    // @public
    reset() {
      this.positionProperty.reset();
      this.speedProperty.reset();
      this.directionProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'Particle', Particle );
} );
