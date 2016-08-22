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
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var hydrogenSymbolString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/hydrogenSymbol' );

  // constants
  var BACK_DEPTH = 10;
  var BACK_OFFSET = 0.15;
  var BOX_SIZE = new Dimension2( 70, 60 );
  var LIGHT_COLOR = 'rgb( 249, 249, 249 )';
  var SHADOW_COLOR = 'rgb( 100, 100, 100 )';

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
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, BACK_DEPTH ).addColorStop( 0, LIGHT_COLOR ).addColorStop( 1, SHADOW_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    // front face
    var frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, 0 ).addColorStop( 0, LIGHT_COLOR ).addColorStop( 1, SHADOW_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    // hydrogen symbol
    var hydrogenSymbol = new Text( hydrogenSymbolString, {
      font: new MOTHAFont( { weight: 'bold', size: 28 } ),
      left: frontNode.left + ( 0.25 * BOX_SIZE.width ),
      bottom: frontNode.bottom - ( 0.15 * BOX_SIZE.height ),
      maxWidth: 0.65 * BOX_SIZE.width
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [  frontNode, topNode, hydrogenSymbol  ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );

  return inherit( Node, BoxOfHydrogenNode );
} );

