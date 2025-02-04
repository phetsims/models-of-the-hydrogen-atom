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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import BohrModel from './BohrModel.js';
import Experiment from './Experiment.js';
import HydrogenAtom from './HydrogenAtom.js';
import LightSource from './LightSource.js';
import Photon from './Photon.js';
import Spectrometer from './Spectrometer.js';
import ZoomedInBox from './ZoomedInBox.js';
import PhotonGroup from './PhotonGroup.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Color } from '../../../../scenery/js/imports.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

// Time step, in seconds, when pressing the time control's step button with speed set to TimeSpeed.NORMAL.
const STEP_ONCE_NORMAL_DT = 0.1;

// Maps TimeSpeed values to scale factors specified via the timeScale query parameter.
const TIME_SCALE_MAP = new Map<TimeSpeed, number>( [
  [ TimeSpeed.FAST, MOTHAQueryParameters.timeScale[ 0 ] ],
  [ TimeSpeed.NORMAL, MOTHAQueryParameters.timeScale[ 1 ] ],
  [ TimeSpeed.SLOW, MOTHAQueryParameters.timeScale[ 2 ] ]
] );

const ExperimentOrModelValues = [ 'experiment', 'model' ] as const;
export type ExperimentOrModel = ( typeof ExperimentOrModelValues )[number];

type SelfOptions = {
  experimentOrModel?: ExperimentOrModel; // initial value of experimentOrModelProperty
};

type MOTHAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MOTHAModel implements TModel {

  // Whether we are viewing the Experiment or a Model of the hydrogen atom.
  // This could have been implemented as a boolean Property, but presents better in Studio as an enumeration.
  public readonly experimentOrModelProperty: StringUnionProperty<ExperimentOrModel>;

  // Atomic model for what is presented as the 'Experiment' in the user interface.
  public readonly experiment: Experiment;

  // The supported set of predictive atomic models.
  public readonly atomicModels: HydrogenAtom[];

  // The predictive atomic model that is currently selected.
  public readonly atomicModelProperty: Property<HydrogenAtom>;

  // The atomic model that is active: either the Experiment, or the selected predictive Model.
  public readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // Whether the value of hydrogenAtomProperty is a quantum model.
  public readonly isQuantumModelProperty: TReadOnlyProperty<boolean>;

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

  protected constructor( zoomedInBox: ZoomedInBox,
                         lightSource: LightSource,
                         atomicModels: HydrogenAtom[],
                         initialAtomicModel: HydrogenAtom,
                         providedOptions: MOTHAModelOptions ) {

    assert && assert( atomicModels.includes( initialAtomicModel ),
      'initialAtomicModel is not one of the supported atomicModels' );

    const options = optionize<MOTHAModelOptions, SelfOptions>()( {

      // SelfOptions
      experimentOrModel: 'experiment'
    }, providedOptions );

    this.zoomedInBox = zoomedInBox;

    this.experimentOrModelProperty = new StringUnionProperty<ExperimentOrModel>( options.experimentOrModel, {
      validValues: ExperimentOrModelValues,
      tandem: options.tandem.createTandem( 'experimentOrModelProperty' ),
      phetioDocumentation: 'Whether we are viewing the Experiment or a Model of the hydrogen atom.',
      phetioFeatured: true
    } );

    this.experiment = new Experiment( MOTHAConstants.ATOM_POSITION, lightSource, {
      tandem: options.tandem.createTandem( 'experiment' )
    } );

    this.atomicModels = atomicModels;

    this.atomicModelProperty = new Property<HydrogenAtom>( initialAtomicModel, {
      validValues: atomicModels,
      tandem: options.tandem.createTandem( 'atomicModelProperty' ),
      phetioDocumentation: 'The hydrogen-atom model that is currently selected in the user interface.',
      phetioFeatured: true,
      phetioValueType: HydrogenAtom.HydrogenAtomIO
    } );

    this.hydrogenAtomProperty = new DerivedProperty(
      [ this.experimentOrModelProperty, this.atomicModelProperty ],
      ( isExperiment, atomicModel ) => isExperiment ? this.experiment : atomicModel );

    this.isQuantumModelProperty = new DerivedProperty( [ this.hydrogenAtomProperty ], hydrogenAtom => ( hydrogenAtom instanceof BohrModel ), {
      tandem: options.tandem.createTandem( 'isQuantumModelProperty' ),
      phetioValueType: BooleanIO
    } );

    this.photonGroup = new PhotonGroup( zoomedInBox, this.hydrogenAtomProperty, options.tandem.createTandem( 'photonGroup' ) );

    this.lightSource = lightSource;

    this.lightSource.photonEmittedEmitter.addListener( ( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color | null ) =>
      this.photonGroup.emitPhotonFromLight( wavelength, position, direction, debugHaloColor ) );

    this.spectrometer = new Spectrometer( this.hydrogenAtomProperty, options.tandem.createTandem( 'spectrometer' ) );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'isPlayingProperty' ),
      phetioDocumentation: 'Whether the model is playing (true) or paused (false).',
      phetioFeatured: true
    } );

    // The Java version had a wider range of speeds and a speed slider. For the HTML5 version, this was simplified to
    // 3 speeds, using the standard PhET TimeControlNode.
    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      validValues: [ TimeSpeed.FAST, TimeSpeed.NORMAL, TimeSpeed.SLOW ],
      tandem: options.tandem.createTandem( 'timeSpeedProperty' ),
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
    this.experimentOrModelProperty.reset();
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
      this._step( dt );
    }
  }

  /**
   * Steps the model by one time step. Used by the Step button in the time controls.
   */
  public stepOnce(): void {
    assert && assert( !this.isPlayingProperty.value, 'stepOnce should only be called when the sim is paused.' );
    this._step( STEP_ONCE_NORMAL_DT );
  }

  /**
   * Steps the model, scaled by the setting of the time controls.
   * @param dt - the time step, in seconds
   */
  private _step( dt: number ): void {
    const dtScaled = dt * this.timeScaleProperty.value;
    this.lightSource.step( dtScaled );
    this.hydrogenAtomProperty.value.step( dtScaled );
    this.photonGroup.step( dtScaled );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );