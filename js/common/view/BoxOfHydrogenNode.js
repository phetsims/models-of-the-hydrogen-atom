// Copyright 2015-2021, University of Colorado Boulder

/**
 * BoxOfHydrogenNode is the box of hydrogen into which the light emits photons and alpha particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import { LinearGradient } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';

// constants
const BACK_DEPTH = 10;
const BACK_OFFSET = 0.15;
const BOX_SIZE = new Dimension2( 50, 40 );
const LIGHT_COLOR = 'rgb( 249, 249, 249 )';
const SHADOW_COLOR = 'rgb( 100, 100, 100 )';

class BoxOfHydrogenNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    // top face, in perspective
    const topNode = new Path( new Shape()
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
    const frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, 0 ).addColorStop( 0, LIGHT_COLOR ).addColorStop( 1, SHADOW_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    // hydrogen symbol, in lower-left corner of front face
    const hydrogenSymbol = new Text( modelsOfTheHydrogenAtomStrings.hydrogenSymbol, {
      font: new PhetFont( { weight: 'bold', size: 24 } ),
      left: frontNode.left + ( 0.15 * BOX_SIZE.width ),
      bottom: frontNode.bottom - ( 0.15 * BOX_SIZE.height ),
      maxWidth: 0.65 * BOX_SIZE.width
    } );

    assert && assert( !options.children, 'BoxOfHydrogenNode sets children' );
    options.children = [ frontNode, topNode, hydrogenSymbol ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );
export default BoxOfHydrogenNode;