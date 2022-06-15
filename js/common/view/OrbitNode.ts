// Copyright 2022, University of Colorado Boulder

/**
 * OrbitNode draws an electron orbits for the Bohr and deBroglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { NodeTranslationOptions, Path, PathOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {

  // In 2D, an orbit is a circle. In 3D, an orbit is an ellipse, foreshortened in the y dimension.
  // Because we're only use 3D viewing angles that are rotations about the x-axis, we can get away
  // with simply scaling the y dimension to create the ellipse. So...
  // To create a 2D orbit, set this value to 1.
  // To create a 3D orbit, set this to a value in the range (0,1) exclusive.
  yScale?: number;
};

type OrbitNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<PathOptions, 'tandem'>;

export default class OrbitNode extends Path {

  /**
   * @param radius - in view coordinates
   * @param [providedOptions]
   */
  public constructor( radius: number, providedOptions?: OrbitNodeOptions ) {

    const options = optionize<OrbitNodeOptions, SelfOptions, PathOptions>()( {

      // SelfOptions
      yScale: 1,

      // PathOptions
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ 3, 3 ]
    }, providedOptions );

    assert && assert( options.yScale > 0 && options.yScale <= 1 );

    const shape = Shape.ellipse( 0, 0, radius, radius * options.yScale, 0 );

    super( shape, options );
  }
}

modelsOfTheHydrogenAtom.register( 'OrbitNode', OrbitNode );