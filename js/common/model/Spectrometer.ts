// Copyright 2024, University of Colorado Boulder

/**
 * Spectrometer is the model for the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from './HydrogenAtom.js';
import Photon from './Photon.js';
import SpectrometerSnapshot from './SpectrometerSnapshot.js';
import SpectrometerDataPoint from './SpectrometerDataPoint.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import photonAbsorptionModel from './PhotonAbsorptionModel.js';
import PlumPuddingModel from './PlumPuddingModel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Spectrometer extends PhetioObject {

  private hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  public readonly recordingEnabledProperty: Property<boolean>;

  public readonly dataPointsProperty: Property<SpectrometerDataPoint[]>;

  public readonly hasDataPointsProperty: TReadOnlyProperty<boolean>;

  public readonly snapshots: ObservableArray<SpectrometerSnapshot>;

  private readonly nextSnapshotNumberProperty: Property<number>;

  public constructor( hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, providedOptions: SpectrometerOptions ) {

    const options = optionize<SpectrometerOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.hydrogenAtomProperty = hydrogenAtomProperty;

    // Controlled by SpectrometerAccordionBox, so that we are not recording unless expanded.
    this.recordingEnabledProperty = new BooleanProperty( false, {
      phetioReadOnly: true,
      tandem: options.tandem.createTandem( 'recordingEnabledProperty' )
    } );

    this.dataPointsProperty = new Property<SpectrometerDataPoint[]>( [], {
      tandem: options.tandem.createTandem( 'dataPointsProperty' ),
      phetioValueType: ArrayIO( SpectrometerDataPoint.SpectrometerDataPointIO ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'Data points (number of photons emitted per wavelength) recorded by the spectrometer.'
    } );

    this.hasDataPointsProperty = new DerivedProperty( [ this.dataPointsProperty ], dataPoints => dataPoints.length > 0, {
      phetioValueType: BooleanIO,
      tandem: options.tandem.createTandem( 'hasDataPointsProperty' )
    } );

    this.nextSnapshotNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      phetioReadOnly: true,
      tandem: options.tandem.createTandem( 'nextSnapshotNumberProperty' )
    } );

    this.snapshots = createObservableArray<SpectrometerSnapshot>( {
      phetioReadOnly: true,
      phetioType: createObservableArray.ObservableArrayIO( SpectrometerSnapshot.SpectrometerSnapshotIO ),
      tandem: options.tandem.createTandem( 'snapshots' )
    } );

    const photonEmittedListener = ( photon: Photon ) => {
      if ( this.recordingEnabledProperty.value ) {
        this.recordEmission( photon.wavelength );
      }
    };

    hydrogenAtomProperty.link( ( newHydrogenAtom, oldHydrogenAtom ) => {

      // When the hydrogen atom model is changed, clear the spectrometer.
      this.clear();

      // For debugging, display maximum numbers of photons for all possible emission wavelengths.
      if ( MOTHAQueryParameters.debugSpectrometer ) {
        this.dataPointsProperty.value = getDebugDataPoints();
      }

      // Wire up the listener to record photon emissions.
      if ( oldHydrogenAtom && oldHydrogenAtom.photonEmittedEmitter.hasListener( photonEmittedListener ) ) {
        oldHydrogenAtom.photonEmittedEmitter.removeListener( photonEmittedListener );
      }
      newHydrogenAtom.photonEmittedEmitter.addListener( photonEmittedListener );
    } );
  }

  /**
   * Takes a snapshot of the current spectrometer data.
   */
  public takeSnapshot(): void {

    const snapshot = new SpectrometerSnapshot( this.nextSnapshotNumberProperty.value, this.hydrogenAtomProperty.value, this.dataPointsProperty.value );
    this.snapshots.push( snapshot );

    this.nextSnapshotNumberProperty.value++;

    snapshot.disposeEmitter.addListener( () => this.snapshots.remove( snapshot ) );
  }

  /**
   * Records an emission of the specified wavelength.
   */
  private recordEmission( wavelength: number ): void {
    assert && assert( this.recordingEnabledProperty.value );

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
    this.snapshots.forEach( snapshot => snapshot.dispose() );
    this.snapshots.clear();
    this.nextSnapshotNumberProperty.reset();
    // Do not reset recordingEnabledProperty. It is set by SpectrometerAccordionBox.
  }

  public clear(): void {
    this.dataPointsProperty.value = [];
  }
}

/**
 * Gets a set of data points that has a large value for all possible emission wavelengths.
 * For debugging with the ?debugSnapshots query parameter.
 */
function getDebugDataPoints(): SpectrometerDataPoint[] {
  const wavelengths = photonAbsorptionModel.getWavelengths();
  wavelengths.push( PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH );
  return wavelengths.map( wavelength => new SpectrometerDataPoint( wavelength, 100 ) );
}

modelsOfTheHydrogenAtom.register( 'Spectrometer', Spectrometer );