// Copyright 2016-2022, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing predicitive models, and shows whether
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Font, IPaint, Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {
  xMargin?: number;
  yMargin?: number;
  font?: Font;
  barFill?: IPaint;
  textFill?: IPaint;
};

type ContinuumBarNodeOptions = SelfOptions & Omit<NodeOptions, 'children'>;

export default class ContinuumBarNode extends Node {

  /**
   * @param barHeight - height of the bar, width is computed based on text size
   * @param providedOptions
   */
  constructor( barHeight: number, providedOptions?: ContinuumBarNodeOptions ) {

    const options = optionize<ContinuumBarNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      xMargin: 5,
      yMargin: 6,
      font: new PhetFont( 14 ),
      barFill: MOTHAColors.continuumBarFillProperty,
      textFill: MOTHAColors.continuumBarTextFillProperty
    }, providedOptions );

    // labels
    const textOptions = {
      font: options.font,
      fill: options.textFill,
      rotation: Math.PI / 2,
      maxWidth: 0.4 * barHeight
    };
    const classicalText = new Text( modelsOfTheHydrogenAtomStrings.classical, textOptions );
    const quantumText = new Text( modelsOfTheHydrogenAtomStrings.quantum, textOptions );

    const barWidth = Math.max( classicalText.width, quantumText.width ) + ( 2 * options.xMargin );
    const barNode = new Rectangle( 0, 0, barWidth, barHeight, {
      cornerRadius: 5,
      fill: options.barFill
    } );

    // 'Classical' at top
    classicalText.centerX = barNode.centerX;
    classicalText.top = barNode.top + options.yMargin;

    // 'Quantum' at bottom
    quantumText.centerX = barNode.centerX;
    quantumText.bottom = barNode.bottom - options.yMargin;

    options.children = [ barNode, classicalText, quantumText ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );