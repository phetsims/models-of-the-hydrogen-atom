// Copyright 2024-2025, University of Colorado Boulder

/**
 * Spectrometer is the model for the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Color from '../../../../scenery/js/util/Color.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import HydrogenAtom from './HydrogenAtom.js';
import PhotonAbsorptionModel from './PhotonAbsorptionModel.js';
import PlumPuddingModel from './PlumPuddingModel.js';
import SpectrometerDataPoint from './SpectrometerDataPoint.js';
import SpectrometerSnapshot from './SpectrometerSnapshot.js';
import EnabledProperty from '../../../../axon/js/EnabledProperty.js';

export default class Spectrometer extends PhetioObject {

  // The hydrogen atom model that is currently selected.
  private hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // Whether the spectrometer is recording data, false when the Spectrometer accordion box is collapsed.
  public readonly enabledProperty: Property<boolean>;

  // Data displayed by the spectrometer.
  public readonly dataPointsProperty: Property<SpectrometerDataPoint[]>;

  // Whether the spectrometer has any data to display.
  public readonly hasDataPointsProperty: TReadOnlyProperty<boolean>;

  // Snapshots of spectrometer data. We are using a Property instead of ObservableArray so that the data can be
  // inspected in Studio, which (as of this writing) is not supported for ObservableArray.
  public readonly snapshotsProperty: Property<SpectrometerSnapshot[]>;

  // Number of snapshots
  public readonly numberOfSnapshotsProperty: TReadOnlyProperty<number>;

  // Snapshots are numbered using consecutive integers, starting from 1.
  private readonly nextSnapshotNumberProperty: Property<number>;

  public constructor( hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioFeatured: true,
      phetioState: false
    } );

    this.hydrogenAtomProperty = hydrogenAtomProperty;

    this.enabledProperty = new EnabledProperty( false, {
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
      phetioDocumentation: 'The number that will be assigned to the next snapshot that is taken. ' +
                           'Snapshots are numbered using consecutive integers, starting from 1. ',
      phetioReadOnly: true
    } );

    this.snapshotsProperty = new Property<SpectrometerSnapshot[]>( [], {
      tandem: tandem.createTandem( 'snapshotsProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true,
      phetioValueType: ArrayIO( SpectrometerSnapshot.SpectrometerSnapshotIO )
    } );

    this.numberOfSnapshotsProperty = new DerivedProperty( [ this.snapshotsProperty ], snapshots => snapshots.length, {
      tandem: tandem.createTandem( 'numberOfSnapshotsProperty' ),
      phetioFeatured: true,
      phetioValueType: NumberIO
    } );

    // When a photon is emitted, record its wavelength.
    const photonEmittedListener = ( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ) => {
      if ( this.enabledProperty.value ) {
        this.recordEmission( wavelength );
      }
    };

    hydrogenAtomProperty.link( ( newHydrogenAtom, oldHydrogenAtom ) => {
      if ( !isSettingPhetioStateProperty.value ) {

        // Clear the spectrometer.
        this.clear();

        // For debugging, display maximum numbers of photons for all possible emission wavelengths.
        if ( MOTHAQueryParameters.debugSpectrometer ) {
          this.dataPointsProperty.value = getDebugDataPoints();
        }
      }

      // Listen for photons emitted.
      if ( oldHydrogenAtom && oldHydrogenAtom.photonEmittedEmitter.hasListener( photonEmittedListener ) ) {
        oldHydrogenAtom.photonEmittedEmitter.removeListener( photonEmittedListener );
      }
      newHydrogenAtom.photonEmittedEmitter.addListener( photonEmittedListener );
    } );
  }

  public reset(): void {
    this.clear();
    this.snapshotsProperty.value.forEach( snapshot => snapshot.dispose() );
    this.snapshotsProperty.value = [];
    this.nextSnapshotNumberProperty.reset();
    // Do not reset enabledProperty. It is controlled by SpectrometerAccordionBox, so that we're recording data only when expanded.
  }

  /**
   * Clears the spectrometer by removing all data points.
   */
  public clear(): void {
    this.dataPointsProperty.value = [];
  }

  /**
   * Takes a snapshot of the current spectrometer data.
   */
  public takeSnapshot(): void {

    // Since each data point is a SpectrometerDataPoint instance, it is insufficient to make a shallow copy of
    // dataPointsProperty.value. We need to make a deep copy of the data points. Otherwise, the snapshots and
    // the spectrometer will be referencing the same SpectrometerDataPoint instances, and those instances will
    // continue to be updated as the spectrometer accumulates data.
    const dataPoints = this.dataPointsProperty.value.map( dataPoint => dataPoint.clone() );

    const snapshot = new SpectrometerSnapshot( this.nextSnapshotNumberProperty.value, this.hydrogenAtomProperty.value, dataPoints );
    this.snapshotsProperty.value = [ ...this.snapshotsProperty.value, snapshot ];

    this.nextSnapshotNumberProperty.value++;
  }

  /**
   * Records an emission of the specified wavelength.
   */
  private recordEmission( wavelength: number ): void {
    assert && assert( this.enabledProperty.value, 'recordEmission should only be called when the spectrometer is enabled.' );

    // To verify that legacy issue https://github.com/phetsims/models-of-the-hydrogen-atom/issues/14 is no longer a problem.
    assert && assert( PhotonAbsorptionModel.instance.getTransition( wavelength ) || PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH,
      `invalid transition wavelength: ${wavelength}` );

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

  /**
   * Deletes a snapshot from the list.
   */
  public deleteSnapshot( snapshot: SpectrometerSnapshot ): void {
    this.snapshotsProperty.value = this.snapshotsProperty.value.filter( element => element !== snapshot );
    snapshot.dispose();
  }
}

/**
 * Gets a set of data points that has a large value for all possible emission wavelengths.
 * For debugging with the ?debugSnapshots query parameter.
 */
function getDebugDataPoints(): SpectrometerDataPoint[] {
  const wavelengths = PhotonAbsorptionModel.instance.getWavelengths();
  wavelengths.push( PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH );
  return wavelengths.map( wavelength => new SpectrometerDataPoint( wavelength, 100 ) );
}

modelsOfTheHydrogenAtom.register( 'Spectrometer', Spectrometer );