// Copyright 2024-2025, University of Colorado Boulder

/**
 * Spectrometer is the model for the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from './HydrogenAtom.js';
import SpectrometerSnapshot from './SpectrometerSnapshot.js';
import SpectrometerDataPoint from './SpectrometerDataPoint.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import photonAbsorptionModel from './PhotonAbsorptionModel.js';
import PlumPuddingModel from './PlumPuddingModel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { Color } from '../../../../scenery/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

export default class Spectrometer extends PhetioObject {

  // The hydrogen atom model that is currently selected.
  private hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // Whether the spectrometer is recording data, false when the Spectrometer accordion box is collapsed.
  public readonly enabledProperty: Property<boolean>;

  // Data displayed by the spectrometer.
  public readonly dataPointsProperty: Property<SpectrometerDataPoint[]>;

  // Whether the spectrometer has any data to display.
  public readonly hasDataPointsProperty: TReadOnlyProperty<boolean>;

  // Snapshots of spectrometer data.
  public readonly snapshots: ObservableArray<SpectrometerSnapshot>;

  // Snapshots are numbered using consecutive integers, starting from 1.
  private readonly nextSnapshotNumberProperty: Property<number>;

  public constructor( hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      tandem: tandem,
      isDisposable: false,
      phetioFeatured: true,
      phetioState: false
    } );

    this.hydrogenAtomProperty = hydrogenAtomProperty;

    this.enabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'enabledProperty' ),
      phetioDocumentation: 'Whether the spectrometer is recording data. Recording is enabled when the Spectrometer accordion box is expanded.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.dataPointsProperty = new Property<SpectrometerDataPoint[]>( [], {
      tandem: tandem.createTandem( 'dataPointsProperty' ),
      phetioDocumentation: 'Data points (number of photons emitted per wavelength) recorded by the spectrometer.',
      phetioFeatured: true,
      phetioReadOnly: true,
      phetioValueType: ArrayIO( SpectrometerDataPoint.SpectrometerDataPointIO )
    } );

    this.hasDataPointsProperty = new DerivedProperty( [ this.dataPointsProperty ], dataPoints => dataPoints.length > 0, {
      tandem: tandem.createTandem( 'hasDataPointsProperty' ),
      phetioDocumentation: 'Whether the spectrometer has data to display.',
      phetioValueType: BooleanIO
    } );

    this.nextSnapshotNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      tandem: tandem.createTandem( 'nextSnapshotNumberProperty' ),
      phetioDocumentation: 'This is the number that will be assigned to the next snapshot that is taken. ' +
                           'Snapshots are numbered using consecutive integers, starting from 1. ',
      phetioReadOnly: true
    } );

    this.snapshots = createObservableArray<SpectrometerSnapshot>( {
      tandem: tandem.createTandem( 'snapshots' ),
      phetioFeatured: true,
      phetioReadOnly: true,
      phetioType: createObservableArray.ObservableArrayIO( SpectrometerSnapshot.SpectrometerSnapshotIO ),
      lengthPropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Add a data point when a photon is emitted.
    const photonEmittedListener = ( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ) => {
      if ( this.enabledProperty.value ) {
        this.recordEmission( wavelength );
      }
    };

    hydrogenAtomProperty.link( ( newHydrogenAtom, oldHydrogenAtom ) => {
      if ( !isSettingPhetioStateProperty.value ) {

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
      }
    } );
  }

  public reset(): void {
    this.clear();
    this.snapshots.forEach( snapshot => snapshot.dispose() );
    this.snapshots.clear();
    this.nextSnapshotNumberProperty.reset();
    // Do not reset enabledProperty. It is controlled by SpectrometerAccordionBox, so that we're recording data only when expanded.
  }

  public clear(): void {
    this.dataPointsProperty.value = [];
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
    assert && assert( this.enabledProperty.value );

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