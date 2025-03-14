// Copyright 2022-2025, University of Colorado Boulder

/**
 * Proton is the model of a proton. It is not instrumented for PhET-iO because it has no state and no fields of interest.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {
  position?: Vector2;
};

type ProtonOptions = SelfOptions;

export default class Proton {

  // Radius, in unitless model coordinates.
  public static readonly RADIUS = 6;

  // Position of the proton, fixed at the center of the atom.
  public readonly position: Vector2;

  public constructor( providedOptions?: ProtonOptions ) {

    const options = optionize<ProtonOptions, SelfOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 )
    }, providedOptions );

    this.position = options.position;
  }
}

modelsOfTheHydrogenAtom.register( 'Proton', Proton );