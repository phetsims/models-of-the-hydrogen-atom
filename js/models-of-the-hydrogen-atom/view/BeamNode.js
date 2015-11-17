// Copyright 2015, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var BEAM_SIZE = new Dimension2( 52, 75 );

  /**
   * @param {Property.<boolean>} visibleProperty - is the beam visible?
   * @param {Property.<Color|string>} colorProperty - the beam's color
   * @param {Object} [options]
   * @constructor
   */
  function BeamNode( visibleProperty, colorProperty, options ) {

    Rectangle.call( this, 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
    colorProperty.linkAttribute( this, 'fill' );
  }

  modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );

  return inherit( Rectangle, BeamNode );
} );