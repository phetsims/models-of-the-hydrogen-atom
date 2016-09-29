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
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Vector2} location - location in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   * @constructor
   */
  function Particle( location, speed, direction ) {

    // @public
    this.locationProperty = new Property( location );
    this.speedProperty = new NumberProperty( speed );
    this.directionProperty = new NumberProperty( direction );
  }

  modelsOfTheHydrogenAtom.register( 'Particle', Particle );

  return inherit( Object, Particle, {

    // @public
    reset: function() {
      this.locationProperty.reset();
      this.speedProperty.reset();
      this.directionProperty.reset();
    }
  } );
} );
