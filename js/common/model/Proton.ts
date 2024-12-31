// Copyright 2022-2024, University of Colorado Boulder

/**
 * Proton is the model of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = {
  position?: Vector2;
};

type ProtonOptions = SelfOptions;

export default class Proton extends PhetioObject {

  public readonly position: Vector2;
  public readonly radius = MOTHAConstants.PROTON_RADIUS;

  public constructor( providedOptions?: ProtonOptions ) {

    const options = optionize<ProtonOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.position = options.position;
  }
}

modelsOfTheHydrogenAtom.register( 'Proton', Proton );