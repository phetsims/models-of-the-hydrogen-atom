// Copyright 2015-2022, University of Colorado Boulder

/**
 * BoxOfHydrogenNode is the box of hydrogen into which the light emits photons and alpha particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, NodeOptions, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';

// constants
const BACK_DEPTH = 10;
const BACK_OFFSET = 0.15;
const BOX_SIZE = new Dimension2( 50, 40 );
const LIGHT_COLOR = 'rgb( 249, 249, 249 )';
const SHADOW_COLOR = 'rgb( 100, 100, 100 )';

type SelfOptions = {};

type BoxOfHydrogenNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'centerX' | 'bottom'>;

export default class BoxOfHydrogenNode extends Node {

  constructor( providedOptions: BoxOfHydrogenNodeOptions ) {

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

    const options = optionize<BoxOfHydrogenNodeOptions, SelfOptions, NodeOptions>()( {
      children: [ frontNode, topNode, hydrogenSymbol ]
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );