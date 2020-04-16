// Copyright 2016-2020, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing predicitive models, and shows whether
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

class ContinuumBarNode extends Node {

  /**
   * @param {number} barHeight - height of the bar, width is computed based on text size
   * @param {Object} [options]
   */
  constructor( barHeight, options ) {

    options = merge( {
      xMargin: 5,
      yMargin: 6,
      font: new PhetFont( 14 ),
      barFill: MOTHAColorProfile.continuumBarFillProperty,
      textFill: MOTHAColorProfile.continuumBarTextFillProperty
    }, options );

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

    assert && assert( !options.children, 'ContinuumBarNode sets children' );
    options.children = [ barNode, classicalText, quantumText ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );
export default ContinuumBarNode;