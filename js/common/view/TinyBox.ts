// Copyright 2015-2025, University of Colorado Boulder

/**
 * TinyBox indicates the portion of the box of hydrogen that is shown in the zoomed-in view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

const TINY_BOX_SIZE = new Dimension2( 6, 6 );

type SelfOptions = EmptySelfOptions;

type TinyBoxOptions = SelfOptions & NodeTranslationOptions & PickOptional<RectangleOptions, 'visibleProperty'>;

export default class TinyBox extends Rectangle {

  public constructor( providedOptions: TinyBoxOptions ) {

    const options = optionize<TinyBoxOptions, SelfOptions, RectangleOptions>()( {

      // RectangleOptions
      isDisposable: false,
      fill: MOTHAColors.zoomedInBoxFillProperty,
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineWidth: 2
    }, providedOptions );

    super( 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );