// Copyright 2015, University of Colorado Boulder

/**
 * The light. Origin is at center of nozzle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RoundStickyToggleButton = require( 'SUN/buttons/RoundStickyToggleButton' );

  // constants
  var NOZZLE_SIZE = new Dimension2( 60, 20 );
  var BODY_SIZE = new Dimension2( 1.3 * NOZZLE_SIZE.width, 110 );
  var BASE_COLOR = 'rgb( 180, 180, 180 )';
  var HIGHLIGHT_COLOR = 'rgb( 245, 245, 245 )';

  /**
   * @param {Property.<boolean>} onProperty - is the gun on?
   * @param options
   * @constructor
   */
  function LightNode( onProperty, options ) {

    options = options || {};

    var nozzleNode = new Rectangle( 0, 0, NOZZLE_SIZE.width, NOZZLE_SIZE.height, {
      cornerRadius: 5,
      fill: new LinearGradient( 0, 0, NOZZLE_SIZE.width, 0 )
        .addColorStop( 0, BASE_COLOR)
        .addColorStop( 0.3, HIGHLIGHT_COLOR )
        .addColorStop( 1, BASE_COLOR),
      stroke: 'black'
    } );

    var bodyNode = new Rectangle( 0, 0, BODY_SIZE.width, BODY_SIZE.height, {
      cornerRadius: 5,
      fill: new LinearGradient( 0, 0, BODY_SIZE.width, 0 )
        .addColorStop( 0, BASE_COLOR )
        .addColorStop( 0.3, HIGHLIGHT_COLOR )
        .addColorStop( 1, BASE_COLOR ),
      stroke: 'black',
      centerX: nozzleNode.centerX,
      top: nozzleNode.bottom - 6 // overlap to hide corner radius
    } );

    var button = new RoundStickyToggleButton( false, true, onProperty, {
      radius: 22,
      touchExpansion: 15,
      baseColor: 'red',
      center: bodyNode.center
    } );

    options.children = [ nozzleNode, bodyNode, button ];
    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'LightNode', LightNode );

  return inherit( Node, LightNode );
} );
