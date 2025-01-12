// Copyright 2015-2024, University of Colorado Boulder

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
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import BohrModel from './BohrModel.js';
import Experiment from './Experiment.js';
import HydrogenAtom from './HydrogenAtom.js';
import Light from './Light.js';
import Photon from './Photon.js';
import Spectrometer from './Spectrometer.js';
import ZoomedInBox from './ZoomedInBox.js';
import PhotonSystem from './PhotonSystem.js';

const STEP_ONCE_NORMAL_DT = 0.1;

const TIME_SCALE_MAP = new Map<TimeSpeed, number>( [
  [ TimeSpeed.FAST, MOTHAQueryParameters.timeScale[ 0 ] ],
  [ TimeSpeed.NORMAL, MOTHAQueryParameters.timeScale[ 1 ] ],
  [ TimeSpeed.SLOW, MOTHAQueryParameters.timeScale[ 2 ] ]
] );

export default class MOTHAModel implements TModel {

  // whether we are viewing the experiment (true) or a predictive model (false) of the hydrogen atom.
  public readonly isExperimentProperty: Property<boolean>;

  // the experiment hydrogen atom
  public readonly experiment: Experiment;

  // the supported set of predictive hydrogen-atom models
  public readonly predictiveModels: HydrogenAtom[];

  // the predictive hydrogen-atom model that is currently selected
  public readonly predictiveModelProperty: Property<HydrogenAtom>;

  // the hydrogen-atom model that is active: either the experiment, or the selected predictive model.
  public readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // whether hydrogenAtomProperty is a quantum model
  public readonly isQuantumModelProperty: TReadOnlyProperty<boolean>;

  // the zoomed-in part of the box of hydrogen
  public readonly zoomedInBox: ZoomedInBox;

  // the light that is shining into the box of hydrogen
  public readonly light: Light;

  public readonly spectrometer: Spectrometer;

  // the system of photons inside zoomedInBox
  public readonly photonSystem: PhotonSystem;

  // is the simulation playing?
  public readonly isPlayingProperty: Property<boolean>;

  // speed that the simulation is running at
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  // scale factor applied to dt, based on timeSpeedProperty
  private readonly timeScaleProperty: TReadOnlyProperty<number>;

  /**
   * @param zoomedInBox - the zoomed-in part of the box of hydrogen, where animation takes place
   * @param light
   * @param predictiveModels
   * @param initialPredictiveModel
   * @param tandem
   */
  protected constructor( zoomedInBox: ZoomedInBox,
                         light: Light,
                         predictiveModels: HydrogenAtom[],
                         initialPredictiveModel: HydrogenAtom,
                         tandem: Tandem ) {

    assert && assert( predictiveModels.includes( initialPredictiveModel ) );

    this.zoomedInBox = zoomedInBox;

    this.isExperimentProperty = new BooleanProperty( false, { //TODO initial value should be true
      tandem: tandem.createTandem( 'isExperimentProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Whether we are viewing the Experiment (true) or a Model (false) of the hydrogen atom.'
    } );

    this.experiment = new Experiment( light, {
      tandem: tandem.createTandem( 'experiment' )
    } );

    this.predictiveModels = predictiveModels;

    this.predictiveModelProperty = new Property<HydrogenAtom>( initialPredictiveModel, {
      validValues: predictiveModels,
      tandem: tandem.createTandem( 'predictiveModelProperty' ),
      phetioValueType: HydrogenAtom.HydrogenAtomIO,
      phetioFeatured: true
    } );

    this.hydrogenAtomProperty = new DerivedProperty(
      [ this.isExperimentProperty, this.predictiveModelProperty ],
      ( isExperiment, predictiveModel ) => isExperiment ? this.experiment : predictiveModel );

    this.isQuantumModelProperty = new DerivedProperty( [ this.hydrogenAtomProperty ],
      hydrogenAtom => ( hydrogenAtom instanceof BohrModel ) );

    this.photonSystem = new PhotonSystem( zoomedInBox, this.hydrogenAtomProperty, tandem.createTandem( 'photonSystem' ) );

    this.light = light;

    this.light.photonCreatedEmitter.addListener( photon => this.photonSystem.addPhoton( photon ) );

    this.spectrometer = new Spectrometer( this.hydrogenAtomProperty, {
      tandem: tandem.createTandem( 'spectrometer' )
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      validValues: MOTHAConstants.TIME_SPEEDS,
      tandem: tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );

    this.timeScaleProperty = new DerivedProperty( [ this.timeSpeedProperty ],
      timeSpeed => {
        const dtScale = TIME_SCALE_MAP.get( timeSpeed );
        assert && assert( dtScale !== undefined );
        return dtScale!;
      }
    );

    const photonEmittedListener = ( photon: Photon ) => this.photonSystem.addPhoton( photon );
    const photonAbsorbedEmitter = ( photon: Photon ) => this.photonSystem.removePhoton( photon );

    this.hydrogenAtomProperty.link( ( hydrogenAtom, oldHydrogenAtom ) => {
      this.photonSystem.removeAllPhotons();

      if ( oldHydrogenAtom ) {
        oldHydrogenAtom.reset();
        if ( oldHydrogenAtom.photonEmittedEmitter.hasListener( photonEmittedListener ) ) {
          oldHydrogenAtom.photonEmittedEmitter.removeListener( photonEmittedListener );
        }
        if ( oldHydrogenAtom.photonAbsorbedEmitter.hasListener( photonAbsorbedEmitter ) ) {
          oldHydrogenAtom.photonAbsorbedEmitter.removeListener( photonAbsorbedEmitter );
        }
      }
      hydrogenAtom.photonEmittedEmitter.addListener( photonEmittedListener );
      hydrogenAtom.photonAbsorbedEmitter.addListener( photonAbsorbedEmitter );
    } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.isExperimentProperty.reset();
    this.experiment.reset();
    this.predictiveModels.forEach( predictiveModel => predictiveModel.reset() );
    this.predictiveModelProperty.reset();
    this.light.reset();
    this.spectrometer.reset();
    this.photonSystem.reset();
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
  }

  /**
   * Steps the model if it's playing.
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
    assert && assert( !this.isPlayingProperty.value );
    this._step( STEP_ONCE_NORMAL_DT );
  }

  /**
   * Steps the model, scaled by the setting of the time controls.
   * @param dt - the time step, in seconds
   */
  private _step( dt: number ): void {
    const dtScaled = dt * this.timeScaleProperty.value;
    this.light.step( dtScaled );
    this.hydrogenAtomProperty.value.step( dtScaled );
    this.photonSystem.step( dtScaled );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );