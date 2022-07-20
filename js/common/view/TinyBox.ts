// Copyright 2015-2022, University of Colorado Boulder

/**
 * TinyBox indicates the portion of the box of hydrogen that is shown in the exploded view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { NodeTranslationOptions, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

// constants
const TINY_BOX_SIZE = new Dimension2( 6, 6 );

type SelfOptions = EmptySelfOptions;

type TinyBoxOptions = SelfOptions & NodeTranslationOptions & PickRequired<RectangleOptions, 'tandem'>;

export default class TinyBox extends Rectangle {

  public constructor( providedOptions: TinyBoxOptions ) {

    const options = optionize<TinyBoxOptions, SelfOptions, RectangleOptions>()( {

      // RectangleOptions
      fill: MOTHAColors.zoomedInBoxFillProperty,
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineWidth: 2
    }, providedOptions );

    super( 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'TinyBox', TinyBox );