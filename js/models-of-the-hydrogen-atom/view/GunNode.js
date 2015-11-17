// Copyright 2015, University of Colorado Boulder

/**
 * The gun. Origin is at center of nozzle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoundStickyToggleButton = require( 'SUN/buttons/RoundStickyToggleButton' );

  // images
  var gunImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/gun.png' );

  /**
   * @param {Property.<boolean>} onProperty - is the gun on?
   * @param options
   * @constructor
   */
  function GunNode( onProperty, options ) {

    options = options || {};

    var gunNode = new Image( gunImage, {
      x: -56 // determined empirically, dependent on gunImage
    } );

    var button = new RoundStickyToggleButton( false, true, onProperty, {
      radius: 20,
      baseColor: 'red',
      centerX: 0,
      centerY: gunNode.top + 92  // determined empirically, dependent on gunImage
    } );

    options.children = [ gunNode, button ];
    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'GunNode', GunNode );

  return inherit( Node, GunNode );
} );
