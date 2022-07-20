// Copyright 2015-2022, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = EmptySelfOptions;

export type MOTHAViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MOTHAViewProperties {

  // is the Key accordion box expanded?
  public readonly keyExpandedProperty: Property<boolean>;

  // is the Spectrometer accordion box expanded?
  public readonly spectrometerExpandedProperty: Property<boolean>;

  // are absorption wavelengths indicated on the wavelength slider?
  public readonly absorptionWavelengthsVisibleProperty: Property<boolean>;

  //TODO for prototyping
  // number of spectrometer snapshots
  public readonly numberOfSnapshotsProperty: Property<number>;

  public constructor( providedOptions: MOTHAViewPropertiesOptions ) {

    const options = providedOptions;

    this.keyExpandedProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'keyExpandedProperty' )
    } );

    this.spectrometerExpandedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'spectrometerExpandedProperty' )
    } );

    this.absorptionWavelengthsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'absorptionWavelengthsVisibleProperty' )
    } );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'numberOfSnapshotsProperty' )
    } );
  }

  public reset(): void {
    this.keyExpandedProperty.reset();
    this.spectrometerExpandedProperty.reset();
    this.absorptionWavelengthsVisibleProperty.reset();
    this.numberOfSnapshotsProperty.reset();
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );