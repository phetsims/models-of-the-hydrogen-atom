// Copyright 2024, University of Colorado Boulder

/**
 * Spectrometer is the model for the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Spectrometer extends PhetioObject {

  public readonly numberOfSnapshotsProperty: Property<number>;

  public constructor( providedOptions: SpectrometerOptions ) {

    const options = optionize<SpectrometerOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'numberOfSnapshotsProperty' ),
      phetioReadOnly: true
    } );
  }

  public reset(): void {
    //TODO implement reset
  }

  public clear(): void {
    //TODO implement clear
  }
}

modelsOfTheHydrogenAtom.register( 'Spectrometer', Spectrometer );