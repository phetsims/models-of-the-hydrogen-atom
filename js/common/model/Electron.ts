// Copyright 2022-2024, University of Colorado Boulder

/**
 * Electron is the model of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = {
  position?: Vector2;
};

export type ElectronOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Electron extends PhetioObject {

  public readonly positionProperty: Property<Vector2>;

  public readonly radius = MOTHAConstants.ELECTRON_RADIUS;

  public constructor( providedOptions: ElectronOptions ) {

    const options = optionize<ElectronOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Electron', Electron );