// Copyright 2015, University of Colorado Boulder

/**
 * AnimationBoxNode is the box in which animation of atoms, photons and alpha particles takes place.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AnimationBoxNode( options ) {

    options = options || {};

    var outlineNode = new Rectangle( 0, 0, 450, 450, {
      fill: 'black',
      stroke: 'white',
      lineWidth: 1
    } );

    options.children = [ outlineNode ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'AnimationBoxNode', AnimationBoxNode );

  return inherit( Node, AnimationBoxNode );
} );
