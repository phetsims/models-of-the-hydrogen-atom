// Copyright 2015-2024, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { NodeTranslationOptions, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from '../model/Light.js';

type SelfOptions = {
  beamSize?: Dimension2;
};

type BeamNodeOptions = SelfOptions & NodeTranslationOptions;

export default class BeamNode extends Rectangle {

  public constructor( light: Light, providedOptions?: BeamNodeOptions ) {

    const options = optionize<BeamNodeOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      beamSize: new Dimension2( 30, 65 ),

      // RectangleOptions
      isDisposable: false,
      visibleProperty: light.isOnProperty,
      fill: light.colorProperty,

      // When displaying a white beam on a white background, a stroke is needed.
      stroke: new DerivedProperty( [ light.lightModeProperty ], lightMode => lightMode === 'white' ? 'black' : null ),
      lineWidth: 0.5
    }, providedOptions );

    super( 0, 0, options.beamSize.width, options.beamSize.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );