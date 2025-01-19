// Copyright 2015-2025, University of Colorado Boulder

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
import LightSource from '../model/LightSource.js';

type SelfOptions = {
  beamSize?: Dimension2;
};

type BeamNodeOptions = SelfOptions & NodeTranslationOptions;

export default class BeamNode extends Rectangle {

  public constructor( lightSource: LightSource, providedOptions?: BeamNodeOptions ) {

    const options = optionize<BeamNodeOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      beamSize: new Dimension2( 30, 65 ),

      // RectangleOptions
      isDisposable: false,
      visibleProperty: lightSource.isOnProperty,
      fill: lightSource.colorProperty,

      // When displaying a white beam on a white background, a stroke is needed.
      stroke: new DerivedProperty( [ lightSource.lightModeProperty ], lightMode => lightMode === 'white' ? 'black' : null ),
      lineWidth: 0.5
    }, providedOptions );

    super( 0, 0, options.beamSize.width, options.beamSize.height, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );