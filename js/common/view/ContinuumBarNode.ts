// Copyright 2016-2022, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing predicitive models, and shows whether
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Font, TPaint, Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {
  xMargin?: number;
  yMargin?: number;
  font?: Font;
  barFill?: TPaint;
  textFill?: TPaint;
};

type ContinuumBarNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class ContinuumBarNode extends Node {

  public constructor( barHeight: number, providedOptions?: ContinuumBarNodeOptions ) {

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
    const classicalText = new Text( ModelsOfTheHydrogenAtomStrings.classicalStringProperty, textOptions );
    const quantumText = new Text( ModelsOfTheHydrogenAtomStrings.quantumStringProperty, textOptions );

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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );