// Copyright 2015-2022, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

export type MOTHAViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MOTHAViewProperties {

  //TODO should mode be in model?
  // whether we're viewing an experiment (true) or predictive (false) model
  public readonly experimentEnabledProperty: Property<boolean>;

  // are absorption wavelengths indicated on the wavelength slider?
  public readonly absorptionWavelengthsVisibleProperty: Property<boolean>;

  // is the Spectrometer accordion box expanded?
  public readonly spectrometerExpandedProperty: Property<boolean>;

  //TODO for prototyping
  // number of spectrometer snapshots
  public readonly numberOfSnapshotsProperty: Property<number>;

  constructor( providedOptions: MOTHAViewPropertiesOptions ) {

    const options = providedOptions;

    this.experimentEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'experimentEnabledProperty' )
    } );

    this.absorptionWavelengthsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'absorptionWavelengthsVisibleProperty' )
    } );

    this.spectrometerExpandedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'spectrometerExpandedProperty' )
    } );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'numberOfSnapshotsProperty' )
    } );
  }

  public reset(): void {
    this.experimentEnabledProperty.reset();
    this.absorptionWavelengthsVisibleProperty.reset();
    this.spectrometerExpandedProperty.reset();
    this.numberOfSnapshotsProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );