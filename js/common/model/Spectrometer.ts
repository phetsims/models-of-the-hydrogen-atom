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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from './HydrogenAtom.js';
import Photon from './Photon.js';
import SpectrometerDataPoint from './SpectrometerDataPoint.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Spectrometer extends PhetioObject {

  private recordingEnabled: boolean;

  public readonly dataPointsProperty: Property<SpectrometerDataPoint[]>;

  public readonly numberOfSnapshotsProperty: Property<number>;

  public constructor( hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, providedOptions: SpectrometerOptions ) {

    const options = optionize<SpectrometerOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    // Controlled by SpectrometerAccordionBox, so that we are not recording unless expanded.
    this.recordingEnabled = true;

    this.dataPointsProperty = new Property<SpectrometerDataPoint[]>( [], {
      tandem: options.tandem.createTandem( 'dataPointsProperty' ),
      phetioValueType: ArrayIO( SpectrometerDataPoint.SpectrometerDataPointIO ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'Data points (number of photons emitted per wavelength) recorded by the spectrometer.'
    } );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'numberOfSnapshotsProperty' ),
      phetioReadOnly: true
    } );

    const photonEmittedListener = ( photon: Photon ) => {
      if ( this.recordingEnabled ) {
        this.recordEmission( photon.wavelength );
      }
    };

    hydrogenAtomProperty.link( ( newHydrogenAtom, oldHydrogenAtom ) => {

      // When the hydrogen atom model is changed, clear the spectrometer.
      this.clear();

      // Wire up the listener to record photon emissions.
      if ( oldHydrogenAtom && oldHydrogenAtom.photonEmittedEmitter.hasListener( photonEmittedListener ) ) {
        oldHydrogenAtom.photonEmittedEmitter.removeListener( photonEmittedListener );
      }
      newHydrogenAtom.photonEmittedEmitter.addListener( photonEmittedListener );
    } );
  }

  /**
   * Records an emission of the specified wavelength.
   */
  private recordEmission( wavelength: number ): void {
    assert && assert( this.recordingEnabled );

    const dataPoints = this.dataPointsProperty.value.slice();

    // Increment an existing data point if it exists. Otherwise, add a new data point.
    let dataPoint = _.find( dataPoints, dataPoint => dataPoint.wavelength === wavelength );
    if ( dataPoint ) {
      dataPoint.numberOfPhotonsEmitted++;
    }
    else {
      dataPoint = new SpectrometerDataPoint( wavelength, 1 );
      dataPoints.push( dataPoint );
    }

    // Sort by ascending wavelength for nice presentation in Studio.
    // This also creates a new array, so that dataPointsProperty notifies listeners.
    this.dataPointsProperty.value = _.sortBy( dataPoints, dataPoint => dataPoint.wavelength );
  }

  public reset(): void {
    this.clear();
    this.recordingEnabled = true;
    //TODO delete snapshots
  }

  public clear(): void {
    this.dataPointsProperty.value = [];
  }

  public setRecordingEnabled( recordingEnabled: boolean ): void {
    this.recordingEnabled = recordingEnabled;
  }
}

modelsOfTheHydrogenAtom.register( 'Spectrometer', Spectrometer );