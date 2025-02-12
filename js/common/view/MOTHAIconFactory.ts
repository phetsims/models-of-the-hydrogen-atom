// Copyright 2025, University of Colorado Boulder

/**
 * MOTHAIconFactory is a collection of functions that create icons for this sim.
 *
 * Since icons appear as fields in the model (see HydrogenAtom.icon) having these functions in a separate file
 * prevents problems of circular imports.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import MOTHAColors from '../MOTHAColors.js';
import ProtonNode from './ProtonNode.js';

const MOTHAIconFactory = {

  /**
   * Creates the icon that represents the Schrodinger atomic model in the user interface.
   * The icon consists of 4 overlapping rectangles.
   */
  createSchrodingerIcon(): Node {

    const opacity = 0.4;

    const rect1Size = new Dimension2( 75, 50 );
    const rect3Size = new Dimension2( 1.35 * rect1Size.width, rect1Size.width );
    assert && assert( rect3Size.height === rect1Size.width );

    // rect1 and rect2 have the same dimensions, 90 degrees different (swapped).
    const rect1 = new Rectangle( 0, 0, rect1Size.width, rect1Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity
    } );
    const rect2 = new Rectangle( 0, 0, rect1Size.height, rect1Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    // rect3 and rect4 have the same dimensions, 90 degrees different (swapped).
    const rect3 = new Rectangle( 0, 0, rect3Size.width, rect3Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );
    const rect4 = new Rectangle( 0, 0, rect3Size.height, rect3Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    const protonIcon = ProtonNode.createIcon( 2.5 );
    protonIcon.center = rect1.center;

    return new Node( {
      children: [ rect1, rect2, rect3, rect4, protonIcon ],
      scale: 0.25
    } );
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAIconFactory', MOTHAIconFactory );

export default MOTHAIconFactory;