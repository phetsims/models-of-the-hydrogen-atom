// Copyright 2015-2022, University of Colorado Boulder

/**
 * BoxOfHydrogenNode is the box of hydrogen into which the light emits photons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, NodeOptions, NodeTranslationOptions, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

// constants
const BACK_DEPTH = 10;
const BACK_OFFSET = 0.15;
const BOX_SIZE = new Dimension2( 50, 40 );

type SelfOptions = EmptySelfOptions;

type BoxOfHydrogenNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class BoxOfHydrogenNode extends Node {

  public constructor( providedOptions: BoxOfHydrogenNodeOptions ) {

    // top face, in perspective
    const topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), {
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, BACK_DEPTH )
        .addColorStop( 0, MOTHAColors.boxOfHydrogenLightFillProperty )
        .addColorStop( 1, MOTHAColors.boxOfHydrogenDarkFillProperty ),
      stroke: MOTHAColors.boxOfHydrogenStrokeProperty,
      lineWidth: 1
    } );

    // front face
    const frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, 0 )
        .addColorStop( 0, MOTHAColors.boxOfHydrogenLightFillProperty )
        .addColorStop( 1, MOTHAColors.boxOfHydrogenDarkFillProperty ),
      stroke: MOTHAColors.boxOfHydrogenStrokeProperty,
      lineWidth: 1
    } );

    // hydrogen symbol, in lower-left corner of front face
    const hydrogenSymbol = new Text( ModelsOfTheHydrogenAtomStrings.hydrogenSymbolStringProperty, {
      fill: MOTHAColors.boxOfHydrogenSymbolColorProperty,
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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );