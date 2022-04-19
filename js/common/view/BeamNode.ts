// Copyright 2015-2021, University of Colorado Boulder

//TODO white beam is not visible on white background in projector mode
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Color, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {
  beamSize?: Dimension2;
};

type BeamNodeOptions = SelfOptions &
  PickRequired<RectangleOptions, 'tandem'> &
  PickOptional<RectangleOptions, 'centerX' | 'bottom'>;

export default class BeamNode extends Rectangle {

  /**
   * @param visibleProperty - is the beam visible?
   * @param colorProperty - the beam's color
   * @param providedOptions
   */
  constructor( visibleProperty: IProperty<boolean>, colorProperty: IReadOnlyProperty<Color | string>,
               providedOptions: BeamNodeOptions ) {

    const options = optionize<BeamNodeOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      beamSize: new Dimension2( 10, 50 ),

      // RectangleOptions
      visibleProperty: visibleProperty,
      fill: colorProperty
    }, providedOptions );

    super( 0, 0, options.beamSize.width, options.beamSize.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );