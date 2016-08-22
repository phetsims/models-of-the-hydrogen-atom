// Copyright 2015-2016, University of Colorado Boulder

/**
 * The box of hydrogen into which the light emits photons and alpha particles.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var BACK_DEPTH = 10;
  var BACK_OFFSET = 0.15;
  var BOX_SIZE = new Dimension2( 70, 70 );
  var FRONT_COLOR = 'rgb( 128, 128, 128 )';
  var BACK_COLOR = 'rgb( 64, 64, 64 )';

  /**
   * @param {Object} [options]
   * @constructor
   */
  function BoxOfHydrogenNode( options ) {

    // top face, in perspective
    var topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), {
      fill: new LinearGradient( 0, 0, 0, BACK_DEPTH ).addColorStop( 0, BACK_COLOR ).addColorStop( 1, FRONT_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    // front face
    var frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: FRONT_COLOR,
      stroke: 'black',
      lineWidth: 1
    } );

    options.children = [  frontNode, topNode  ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );

  return inherit( Node, BoxOfHydrogenNode );
} );

