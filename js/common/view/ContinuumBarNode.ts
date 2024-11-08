// Copyright 2016-2024, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing predicitive models, and shows whether
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Font, Node, NodeOptions, Rectangle, Text, TPaint } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = {
  xMargin?: number;
  yMargin?: number;
  font?: Font;
  barFill?: TPaint;
  textFill?: TPaint;
};

type ContinuumBarNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ContinuumBarNode extends Node {

  public constructor( barHeight: number, providedOptions: ContinuumBarNodeOptions ) {

    const options = optionize<ContinuumBarNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      xMargin: 5,
      yMargin: 6,
      font: new PhetFont( 14 ),
      barFill: MOTHAColors.continuumBarFillProperty,
      textFill: MOTHAColors.continuumBarTextFillProperty,

      // NodeOptions
      isDisposable: false
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
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: options.barFill
    } );

    // 'Classical' at top
    classicalText.localBoundsProperty.link( () => {
      classicalText.centerX = barNode.centerX;
      classicalText.top = barNode.top + options.yMargin;
    } );

    // 'Quantum' at bottom
    quantumText.localBoundsProperty.link( () => {
      quantumText.centerX = barNode.centerX;
      quantumText.bottom = barNode.bottom - options.yMargin;
    } );

    options.children = [ barNode, classicalText, quantumText ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );