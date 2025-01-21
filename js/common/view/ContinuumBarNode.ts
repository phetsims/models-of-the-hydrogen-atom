// Copyright 2016-2025, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing a hydrogen atom model, and indicates where
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const X_MARGIN = 5;
const Y_MARGIN = 6;
const FONT = new PhetFont( 14 );

export default class ContinuumBarNode extends Node {

  public constructor( barHeight: number, tandem: Tandem ) {

    // labels
    const textOptions = {
      font: FONT,
      fill: MOTHAColors.continuumBarTextFillProperty,
      rotation: Math.PI / 2,
      maxWidth: 0.4 * barHeight
    };
    const classicalText = new Text( ModelsOfTheHydrogenAtomStrings.classicalStringProperty, textOptions );
    const quantumText = new Text( ModelsOfTheHydrogenAtomStrings.quantumStringProperty, textOptions );

    const barWidth = Math.max( classicalText.width, quantumText.width ) + ( 2 * X_MARGIN );
    const barNode = new Rectangle( 0, 0, barWidth, barHeight, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.continuumBarFillProperty,
      stroke: MOTHAColors.continuumBarStrokeProperty
    } );

    // 'Classical' at top
    classicalText.localBoundsProperty.link( () => {
      classicalText.centerX = barNode.centerX;
      classicalText.top = barNode.top + Y_MARGIN;
    } );

    // 'Quantum' at bottom
    quantumText.localBoundsProperty.link( () => {
      quantumText.centerX = barNode.centerX;
      quantumText.bottom = barNode.bottom - Y_MARGIN;
    } );

    super( {
      isDisposable: false,
      children: [ barNode, classicalText, quantumText ],
      tandem: tandem,
      phetioDocumentation: 'The vertical bar that indicates the continuum from Classical to Quantum atomic model.',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );