// Copyright 2015-2023, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Property from '../../../../axon/js/Property.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from './Light.js';
import HydrogenAtom from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Experiment from './Experiment.js';
import { ModelMode, ModelModeValues } from './ModelMode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const STEP_ONCE_NORMAL_DT = 0.1;
const NORMAL_SPEED_SCALE = MOTHAQueryParameters.timeScale[ 0 ];
const FAST_SPEED_SCALE = MOTHAQueryParameters.timeScale[ 1 ];

export default class MOTHAModel implements TModel {

  // whether we're dealing with the experiment or a predictive hydrogen-atom model
  public readonly modelModeProperty: Property<ModelMode>;

  // the experiment hydrogen-atom model
  public readonly experiment: Experiment;

  // the supported set of predictive hydrogen-atom models
  public readonly predictiveModels: HydrogenAtom[];

  // the predictive hydrogen-atom model that is currently selected
  public readonly predictiveModelProperty: Property<HydrogenAtom>;

  // the hydrogen-atom model that is currently selected: either the Experiment model, or the selected predictive model.
  public readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // the zoomed-in part of the box of hydrogen
  public readonly zoomedInBox: ZoomedInBox;

  // the light that is shining into the box of hydrogen
  public readonly light: Light;

  // photons inside zoomedInBox
  public readonly photons: ObservableArray<Photon>;

  // is the simulation playing?
  public readonly isPlayingProperty: Property<boolean>;

  // speed that the simulation is running at
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  // scale factor applied to dt, based on timeSpeedProperty
  private readonly dtScaleProperty: TReadOnlyProperty<number>;

  /**
   * @param zoomedInBox - the zoomed-in part of the box of hydrogen, where animation takes place
   * @param predictiveModels
   * @param initialPredictiveModel
   * @param tandem
   */
  protected constructor( zoomedInBox: ZoomedInBox,
                         predictiveModels: HydrogenAtom[],
                         initialPredictiveModel: HydrogenAtom,
                         tandem: Tandem ) {

    assert && assert( predictiveModels.includes( initialPredictiveModel ) );

    this.zoomedInBox = zoomedInBox;

    //TODO default should be 'experiment'
    this.modelModeProperty = new StringUnionProperty( 'model', {
      validValues: ModelModeValues,
      tandem: tandem.createTandem( 'modelModeProperty' )
    } );

    this.experiment = new Experiment( zoomedInBox, {
      tandem: tandem.createTandem( 'experiment' )
    } );

    this.predictiveModels = predictiveModels;

    this.predictiveModelProperty = new Property<HydrogenAtom>( initialPredictiveModel, {
      validValues: predictiveModels
      //TODO tandem
      //TODO phetioType
    } );

    this.hydrogenAtomProperty = new DerivedProperty(
      [ this.modelModeProperty, this.predictiveModelProperty ],
      ( modelMode, predictiveModel ) => ( modelMode === 'experiment' ) ? this.experiment : predictiveModel, {
        //TODO tandem
        //TODO phetioType
      } );

    this.light = new Light( zoomedInBox, {
      tandem: tandem.createTandem( 'light' )
    } );

    this.photons = createObservableArray<Photon>( {
      //TODO tandem
      //TODO phetioType
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isPlayingProperty' )
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: tandem.createTandem( 'timeSpeedProperty' )
    } );

    this.dtScaleProperty = new DerivedProperty( [ this.timeSpeedProperty ],
      timeSpeed => ( timeSpeed === TimeSpeed.NORMAL ) ? NORMAL_SPEED_SCALE : FAST_SPEED_SCALE
    );

    this.hydrogenAtomProperty.link( ( hydrogenAtom, oldHydrogenAtom ) => {
      if ( oldHydrogenAtom !== null ) {
        oldHydrogenAtom.reset();
      }
      this.photons.clear();
      hydrogenAtom.photonEmittedEmitter.addListener( this.photonEmittedListener.bind( this ) );
      hydrogenAtom.photonAbsorbedEmitter.addListener( this.photonAbsorbedListener.bind( this ) );
    } );

    this.light.photonCreatedEmitter.addListener( photon => {
      this.photons.add( photon );
    } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.modelModeProperty.reset();
    this.experiment.reset();
    this.predictiveModels.forEach( predictiveModel => predictiveModel.reset() );
    this.predictiveModelProperty.reset();
    this.light.reset();
    while ( this.photons.length > 0 ) {
      this.photons.pop()!.dispose();
    }
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
    const dtScaled = dt * this.dtScaleProperty.value;
    this.light.step( dtScaled );
    this.hydrogenAtomProperty.value.step( dtScaled );
    this.moveAndCullPhotons( dtScaled );
  }

  /**
   * Moves photons. Photons that move outside the zoomed-in box are culled.
   * @param dt - the time step, in seconds
   */
  private moveAndCullPhotons( dt: number ): void {

    const hydrogenAtom = this.hydrogenAtomProperty.value;

    // Move and cull photons. May change this.photons, so operate on a copy of the array.
    this.photons.getArrayCopy().forEach( photon => {
      hydrogenAtom.movePhoton( photon, dt );

      // If the photon leaves the zoomed-in box, cull it.
      if ( !this.zoomedInBox.containsPhoton( photon ) ) {
        photon.dispose();
        this.photons.remove( photon );
      }
    } );
  }

  private photonEmittedListener( photon: Photon ): void {
    this.photons.add( photon );
  }

  private photonAbsorbedListener( photon: Photon ): void {
    this.photons.remove( photon );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );