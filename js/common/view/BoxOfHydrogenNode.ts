// Copyright 2015-2024, University of Colorado Boulder

/**
 * BoxOfHydrogenNode is the box of hydrogen into which the light emits photons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

const BACK_DEPTH = 10;
const BACK_OFFSET = 0.15;
const BOX_SIZE = new Dimension2( 50, 40 );

export default class BoxOfHydrogenNode extends Node {

  public constructor() {

    // front face
    const frontNode = new Rectangle( 0, BACK_DEPTH, BOX_SIZE.width, BOX_SIZE.height, {
      fill: new LinearGradient( 0, 0, BOX_SIZE.width, 0 )
        .addColorStop( 0, MOTHAColors.boxOfHydrogenLightFillProperty )
        .addColorStop( 1, MOTHAColors.boxOfHydrogenDarkFillProperty ),
      stroke: MOTHAColors.boxOfHydrogenStrokeProperty,
      lineWidth: 1
    } );

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

    // 'H' hydrogen symbol, centered in the left 2/3 of the front face.
    const hydrogenText = new Text( ModelsOfTheHydrogenAtomStrings.hydrogenSymbolStringProperty, {
      fill: MOTHAColors.boxOfHydrogenSymbolColorProperty,
      font: new PhetFont( { weight: 'bold', size: 24 } ),
      maxWidth: 0.5 * BOX_SIZE.width
    } );
    hydrogenText.localBoundsProperty.link( () => {
      hydrogenText.centerX = frontNode.left + frontNode.width / 3;
      hydrogenText.centerY = frontNode.centerY;
    } );

    super( {
      isDisposable: false,
      children: [ frontNode, topNode, hydrogenText ]
      // Nothing interesting for PhET-iO, and changing visibleProperty is undesirable, so do not instrument.
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BoxOfHydrogenNode', BoxOfHydrogenNode );