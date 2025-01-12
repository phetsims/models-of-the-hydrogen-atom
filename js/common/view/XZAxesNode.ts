// Copyright 2022-2024, University of Colorado Boulder

/**
 * XZAxesNode displays the x and z axes for the Schrodinger model.
 *
 * In the Java implementation, this was class Axes2DNode in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import MathSymbolFont from '../../../../scenery-phet/js/MathSymbolFont.js';
import { Node, NodeOptions, NodeTranslationOptions, RichText, TColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHASymbols from '../MOTHASymbols.js';

const ARROW_LENGTH = 50;
const LABEL_FONT = new MathSymbolFont( 18 );
const LABEL_OFFSET = 4;

type SelfOptions = {
  color?: TColor; // color for the axes and labels
};

type XZAxesNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class XZAxesNode extends Node {

  public constructor( providedOptions: XZAxesNodeOptions ) {

    const options = optionize<XZAxesNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      color: 'black',

      // NodeOptions
      visiblePropertyOptions: {
        phetioFeatured: true
      }
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
      maxWidth: 20
    } );
    xText.localBoundsProperty.link( () => {
      xText.left = xAxisNode.right + LABEL_OFFSET;
      xText.centerY = xAxisNode.centerY;
    } );

    const zText = new RichText( MOTHASymbols.zStringProperty, {
      font: LABEL_FONT,
      fill: options.color,
      maxWidth: 20
    } );
    zText.localBoundsProperty.link( () => {
      zText.centerX = zAxisNode.centerX;
      zText.bottom = zAxisNode.top - LABEL_OFFSET;
    } );

    options.children = [ xAxisNode, zAxisNode, xText, zText ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'XZAxesNode', XZAxesNode );