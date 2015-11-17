// Copyright 2015, University of Colorado Boulder

/**
 * BoxOfHydrogenNode is the small "box of hydrogen" into which
 * the gun fires photons and alpha particles.  A "tiny box"
 * indicates the portion of the box of hydrogen that is shown
 * in the "exploded" view.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // strings
  var boxOfHydrogenString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/boxOfHydrogen' );

  // constants
  var BACK_DEPTH = 10;
  var BACK_OFFSET = 0.15;
  var BOX_SIZE = new Dimension2( 70, 70 );
  var TINY_BOX_SIZE = new Dimension2( 10, 10 );
  var FRONT_COLOR = 'rgb( 128, 128, 128 )';
  var BACK_COLOR = 'rgb( 64, 64, 64 )';
  var TITLE_OPTIONS = {
    font: new MHAFont( { size: 16, weight: 'bold' } ),
    fill: 'white'
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function BoxOfHydrogenNode( options ) {

    // Box, origin at upper-left of bounds
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
    var frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: FRONT_COLOR,
      stroke: 'black',
      lineWidth: 1
    } );
    var boxNode = new Node( {
      children: [ frontNode, topNode ]
    } );

    // Tiny box
    var tinyBoxNode = new Rectangle( 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      left: boxNode.left + ( 0.6 * boxNode.width ),
      top: boxNode.top + ( 0.3 * boxNode.height )
    } );

    // title
    var titleNode = new MultiLineText( boxOfHydrogenString, _.extend( {}, TITLE_OPTIONS, {
      centerX: boxNode.centerX,
      bottom: boxNode.top - 10,
      maxWidth: 1.25 * BOX_SIZE.width // i18n, determined empirically
    } ) );

    options.children = [ boxNode, tinyBoxNode, titleNode ];
    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );

  return inherit( Node, BoxOfHydrogenNode, {

    //TODO is this needed?
    //    /**
    //     * Gets the global bounds of the tiny box that shows the "exploded"
    //     * part of the box of hydrogen.  We use these bounds to attached
    //     * dashed lines between the box of hydrogen and the exploded view.
    //     *
    //     * @return PBounds
    //     */
    //    public PBounds getTinyBoxGlobalBounds() {
    //        PBounds fb = _tinyBoxNode.getFullBounds();
    //        Point2D gp = localToGlobal( fb.getOrigin() );
    //        Dimension2D gd = localToGlobal( fb.getSize() );
    //        PBounds gb = new PBounds( gp.getX(), gp.getY(), gd.getWidth(), gd.getHeight() );
    //        return gb;
    //    }
  } );
} );

