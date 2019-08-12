// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base type for particles.
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
     * @param {Vector2} location - location in model coordinate frame
     * @param {number} speed - distance per dt
     * @param {number} direction - direction of motion, in radians
     */
    constructor( location, speed, direction ) {

      // @public
      this.locationProperty = new Property( location );
      this.speedProperty = new NumberProperty( speed );
      this.directionProperty = new NumberProperty( direction );
    }

    // @public
    reset() {
      this.locationProperty.reset();
      this.speedProperty.reset();
      this.directionProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'Particle', Particle );
} );
