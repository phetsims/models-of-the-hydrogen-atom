// Copyright 2022-2025, University of Colorado Boulder

/**
 * XZAxesNode displays the x and z axes for the Schrödinger model.
 *
 * In the Java implementation, this was class Axes2DNode in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import MathSymbolFont from '../../../../scenery-phet/js/MathSymbolFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

const ARROW_LENGTH = 50;
const LABEL_FONT = new MathSymbolFont( 18 );
const LABEL_OFFSET = 4;
const COLOR_PROPERTY = MOTHAColors.xzAxesColorProperty;

const ARROW_NODE_OPTIONS: ArrowNodeOptions = {
  fill: COLOR_PROPERTY,
  stroke: null,
  headHeight: 6,
  headWidth: 6,
  tailWidth: 1
};

export default class XZAxesNode extends Node {

  public constructor( tandem: Tandem ) {

    // Axes, with their tails at (0,0)
    const xAxisNode = new ArrowNode( 0, 0, ARROW_LENGTH, 0, ARROW_NODE_OPTIONS );
    const zAxisNode = new ArrowNode( 0, 0, 0, -ARROW_LENGTH, ARROW_NODE_OPTIONS );

    const xText = new RichText( MOTHASymbols.xStringProperty, {
      font: LABEL_FONT,
      fill: COLOR_PROPERTY,
      maxWidth: 20
    } );
    const xTextLeftCenter = xAxisNode.rightCenter.plusXY( LABEL_OFFSET, 0 );
    xText.localBoundsProperty.link( () => {
      xText.leftCenter = xTextLeftCenter;
    } );

    const zText = new RichText( MOTHASymbols.zStringProperty, {
      font: LABEL_FONT,
      fill: COLOR_PROPERTY,
      maxWidth: 20
    } );
    const zTextCenterBottom = zAxisNode.centerTop.plusXY( 0, -LABEL_OFFSET );
    zText.localBoundsProperty.link( () => {
      zText.centerBottom = zTextCenterBottom;
    } );

    super( {
      isDisposable: false,
      children: [ xAxisNode, zAxisNode, xText, zText ],
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'XZAxesNode', XZAxesNode );