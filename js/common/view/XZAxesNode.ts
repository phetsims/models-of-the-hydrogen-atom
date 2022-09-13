// Copyright 2022, University of Colorado Boulder

/**
 * XZAxesNode shows the x and z axes for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Node, NodeOptions, NodeTranslationOptions, RichText, TColor } from '../../../../scenery/js/imports.js';
import MathSymbolFont from '../../../../scenery-phet/js/MathSymbolFont.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MOTHASymbols from '../MOTHASymbols.js';

const ARROW_LENGTH = 100;
const LABEL_FONT = new MathSymbolFont( 18 );
const LABEL_OFFSET = 4;

type SelfOptions = {
  color?: TColor; // color for the axes and labels
};

type XZAxesNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class XZAxesNode extends Node {

  public constructor( providedOptions: XZAxesNodeOptions ) {

    const options = optionize<XZAxesNodeOptions, SelfOptions, NodeOptions>()( {
      color: 'black'
    }, providedOptions );

    const arrowNodeOptions = {
      fill: options.color,
      stroke: null,
      headHeight: 6,
      headWidth: 6,
      tailWidth: 1
    };

    // Axes, with their tails at (0,0)
    const xAxisNode = new ArrowNode( 0, 0, ARROW_LENGTH, 0, arrowNodeOptions );
    const zAxisNode = new ArrowNode( 0, 0, 0, -ARROW_LENGTH, arrowNodeOptions );

    const xText = new RichText( MOTHASymbols.xStringProperty, {
      font: LABEL_FONT,
      fill: options.color,
      left: xAxisNode.right + LABEL_OFFSET,
      centerY: xAxisNode.centerY,
      tandem: options.tandem.createTandem( 'xText' )
    } );

    const zText = new RichText( MOTHASymbols.zStringProperty, {
      font: LABEL_FONT,
      fill: options.color,
      centerX: zAxisNode.centerX,
      bottom: zAxisNode.top - LABEL_OFFSET,
      tandem: options.tandem.createTandem( 'zText' )
    } );

    options.children = [ xAxisNode, zAxisNode, xText, zText ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'XZAxesNode', XZAxesNode );