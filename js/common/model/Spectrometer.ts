// Copyright 2024, University of Colorado Boulder

/**
 * Spectrometer is the model for the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

export default class Spectrometer extends PhetioObject {

  public readonly numberOfSnapshotsProperty: Property<number>;

  public constructor( tandem: Tandem ) {
    super( {

      // PhetioObjectOptions
      isDisposable: false,
      tandem: tandem,
      phetioState: false
    } );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberOfSnapshotsProperty' ),
      phetioReadOnly: true
    } );
  }

  public reset(): void {
    //TODO implement reset
  }
}

modelsOfTheHydrogenAtom.register( 'Spectrometer', Spectrometer );