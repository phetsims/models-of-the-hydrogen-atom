// Copyright 2015-2021, University of Colorado Boulder

/**
 * TinyBox indicates the portion of the box of hydrogen that is shown in the exploded view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

// constants
const TINY_BOX_SIZE = new Dimension2( 6, 6 );

type SelfOptions = {};

type TinyBoxOptions = SelfOptions &
  PickRequired<RectangleOptions, 'tandem'> &
  PickOptional<RectangleOptions, 'right' | 'top'>;

export default class TinyBox extends Rectangle {

  constructor( providedOptions: TinyBoxOptions ) {

    const options = optionize<TinyBoxOptions, SelfOptions, RectangleOptions>()( {

      // RectangleOptions
      fill: MOTHAColors.boxFillProperty,
      stroke: MOTHAColors.boxStrokeProperty,
      lineWidth: 2
    }, providedOptions );

    super( 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );