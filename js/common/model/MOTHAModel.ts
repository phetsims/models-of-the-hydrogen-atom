// Copyright 2015-2025, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Disposable from '../../../../axon/js/Disposable.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import TModel from '../../../../joist/js/TModel.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import Color from '../../../../scenery/js/util/Color.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import Experiment from './Experiment.js';
import HydrogenAtom from './HydrogenAtom.js';
import LightSource from './LightSource.js';
import Photon from './Photon.js';
import PhotonGroup from './PhotonGroup.js';
import Spectrometer from './Spectrometer.js';
import ZoomedInBox from './ZoomedInBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// Maps TimeSpeed values to scale factors specified via the timeScale query parameter.
const TIME_SCALE_MAP = new Map<TimeSpeed, number>( [
  [ TimeSpeed.FAST, MOTHAQueryParameters.timeScale[ 0 ] ],
  [ TimeSpeed.NORMAL, MOTHAQueryParameters.timeScale[ 1 ] ],
  [ TimeSpeed.SLOW, MOTHAQueryParameters.timeScale[ 2 ] ]
] );

const ModelOrExperimentValues = [ 'model', 'experiment' ] as const;
export type ModelOrExperiment = ( typeof ModelOrExperimentValues )[number];

export default class MOTHAModel implements TModel {

  // Whether we are viewing a Model of the hydrogen atom or an Experiment.
  // This could have been implemented as a boolean Property, but presents better in Studio as an enumeration.
  public readonly modelOrExperimentProperty: StringUnionProperty<ModelOrExperiment>;

  // Atomic model for what is presented as the 'Experiment' in the user interface.
  public readonly experiment: Experiment;

  // The supported set of predictive atomic models.
  public readonly atomicModels: HydrogenAtom[];

  // The predictive atomic model that is currently selected.
  public readonly atomicModelProperty: Property<HydrogenAtom>;

  // The atomic model that is active: either the Experiment, or the selected predictive Model.
  public readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // Whether the value of hydrogenAtomProperty is a quantum atom.
  public readonly isQuantumAtomProperty: TReadOnlyProperty<boolean>;

  // The zoomed-in part of the box of hydrogen.
  public readonly zoomedInBox: ZoomedInBox;

  // The light source that is shining into the box of hydrogen.
  public readonly lightSource: LightSource;

  // The spectrometer that is used to measure photon emission.
  public readonly spectrometer: Spectrometer;

  // Manages dynamic Photon elements for PhET-iO.
  public readonly photonGroup: PhotonGroup;

  // Whether the simulation is playing (true) or paused (false).
  public readonly isPlayingProperty: Property<boolean>;

  // Speed that the simulation is running at.
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  // Scale factor applied to dt, based on timeSpeedProperty.
  private readonly timeScaleProperty: TReadOnlyProperty<number>;

  // Time step, in seconds, when pressing the time control's step button with speed set to TimeSpeed.NORMAL.
  public static readonly STEP_ONCE_NORMAL_DT = 0.1;

  protected constructor( zoomedInBox: ZoomedInBox,
                         lightSource: LightSource,
                         atomicModels: HydrogenAtom[],
                         initialAtomicModel: HydrogenAtom,
                         tandem: Tandem ) {

    assert && assert( atomicModels.includes( initialAtomicModel ),
      'initialAtomicModel is not one of the supported atomicModels' );

    this.zoomedInBox = zoomedInBox;

    this.modelOrExperimentProperty = new StringUnionProperty( 'model', {
      validValues: ModelOrExperimentValues,
      tandem: tandem.createTandem( 'modelOrExperimentProperty' ),
      phetioDocumentation: 'Whether we are viewing a Model of the hydrogen atom or an Experiment.',
      phetioFeatured: true
    } );

    this.experiment = new Experiment( MOTHAConstants.ATOM_POSITION, lightSource, {
      tandem: tandem.createTandem( 'experiment' )
    } );

    this.atomicModels = atomicModels;

    this.atomicModelProperty = new Property<HydrogenAtom>( initialAtomicModel, {
      validValues: atomicModels,
      tandem: tandem.createTandem( 'atomicModelProperty' ),
      phetioDocumentation: 'The hydrogen-atom model that is currently selected in the user interface.',
      phetioFeatured: true,
      phetioValueType: HydrogenAtom.HydrogenAtomIO
    } );

    this.hydrogenAtomProperty = new DerivedProperty(
      [ this.modelOrExperimentProperty, this.atomicModelProperty ],
      ( modelOrExperiment, atomicModel ) => modelOrExperiment === 'model' ? atomicModel : this.experiment );

    this.isQuantumAtomProperty = new DerivedProperty( [ this.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom.isQuantum );

    this.photonGroup = new PhotonGroup( zoomedInBox, this.hydrogenAtomProperty, tandem.createTandem( 'photonGroup' ) );

    this.lightSource = lightSource;

    this.lightSource.photonEmittedEmitter.addListener( ( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color | null ) =>
      this.photonGroup.emitPhotonFromLight( wavelength, position, direction, debugHaloColor ) );

    this.spectrometer = new Spectrometer( this.hydrogenAtomProperty, tandem.createTandem( 'spectrometer' ) );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isPlayingProperty' ),
      phetioDocumentation: 'Whether the model is playing (true) or paused (false).',
      phetioFeatured: true
    } );

    // The Java version had a wider range of speeds and a speed slider. For the HTML5 version, this was simplified to
    // 3 speeds, using the standard PhET TimeControlNode.
    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      validValues: [ TimeSpeed.FAST, TimeSpeed.NORMAL, TimeSpeed.SLOW ],
      tandem: tandem.createTandem( 'timeSpeedProperty' ),
      phetioDocumentation: 'Speed at which the model is playing.',
      phetioFeatured: true
    } );

    this.timeScaleProperty = new DerivedProperty( [ this.timeSpeedProperty ],
      timeSpeed => {
        const dtScale = TIME_SCALE_MAP.get( timeSpeed );
        assert && assert( dtScale !== undefined );
        return dtScale!;
      }
    );

    // Listeners for photon emission and absorption.
    const photonEmittedListener = ( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ) =>
      this.photonGroup.emitPhotonFromAtom( wavelength, position, direction, debugHaloColor );
    const photonAbsorbedEmitter = ( photon: Photon ) => this.photonGroup.disposeElement( photon );

    this.hydrogenAtomProperty.link( ( hydrogenAtom, oldHydrogenAtom ) => {
      if ( !isSettingPhetioStateProperty.value ) {

        // Clear photons and reset the previous atomic model.
        this.photonGroup.clear();
        oldHydrogenAtom && oldHydrogenAtom.reset();
      }

      // Listen for photons emitted.
      if ( oldHydrogenAtom && oldHydrogenAtom.photonEmittedEmitter.hasListener( photonEmittedListener ) ) {
        oldHydrogenAtom.photonEmittedEmitter.removeListener( photonEmittedListener );
      }
      hydrogenAtom.photonEmittedEmitter.addListener( photonEmittedListener );

      // Listener for photons absorbed.
      if ( oldHydrogenAtom && oldHydrogenAtom.photonAbsorbedEmitter.hasListener( photonAbsorbedEmitter ) ) {
        oldHydrogenAtom.photonAbsorbedEmitter.removeListener( photonAbsorbedEmitter );
      }
      hydrogenAtom.photonAbsorbedEmitter.addListener( photonAbsorbedEmitter );
    } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.modelOrExperimentProperty.reset();
    this.experiment.reset();
    this.atomicModels.forEach( atomicModel => atomicModel.reset() );
    this.atomicModelProperty.reset();
    this.lightSource.reset();
    this.spectrometer.reset();
    this.photonGroup.clear();
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
  }

  /**
   * Steps the model, if it's playing.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isPlayingProperty.value ) {
      this.stepOnce( dt );
    }
  }

  /**
   * Steps the model by one time step.
   */
  public stepOnce( dt = MOTHAModel.STEP_ONCE_NORMAL_DT ): void {
    const dtScaled = dt * this.timeScaleProperty.value;
    this.lightSource.step( dtScaled );
    this.hydrogenAtomProperty.value.step( dtScaled );
    this.photonGroup.step( dtScaled );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );