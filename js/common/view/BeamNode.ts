// Copyright 2015-2023, University of Colorado Boulder

//TODO white beam is not visible on white background in projector mode https://github.com/phetsims/tasks/issues/1129
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { NodeTranslationOptions, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {
  beamSize?: Dimension2;
};

type BeamNodeOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<RectangleOptions, 'tandem' | 'visibleProperty' | 'fill'>;

export default class BeamNode extends Rectangle {

  public constructor( providedOptions: BeamNodeOptions ) {

    const options = optionize<BeamNodeOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      beamSize: new Dimension2( 30, 65 ),

      // RectangleOptions
      isDisposable: false
    }, providedOptions );

    super( 0, 0, options.beamSize.width, options.beamSize.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );