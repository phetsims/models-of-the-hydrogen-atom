// Copyright 2015-2022, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from './Light.js';
import HydrogenAtom from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import AlphaParticle from './AlphaParticle.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import ExperimentModel from './ExperimentModel.js';
import { ModelMode, ModelModeValues } from './ModelMode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';

type SelfOptions = {};

export type MOTHAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class MOTHAModel {

  // whether we're dealing with the experiment or a predictive hydrogen-atom model
  public readonly modelModeProperty: Property<ModelMode>;

  // the experiment hydrogen-atom model
  public readonly experimentModel: ExperimentModel;

  // the supported set of predictive hydrogen-atom models
  public readonly predictiveModels: HydrogenAtom[];

  // the predictive hydrogen-atom model that is currently selected
  public readonly predictiveModelProperty: Property<HydrogenAtom>;

  // the hydrogen-atom model that is currently selected: either the Experiment model, or the selected predictive model.
  public readonly hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>;

  // the zoomed-in part of the box of hydrogen
  public readonly zoomedInBox: ZoomedInBox;

  // the light that is shining into the box of hydrogen
  public readonly light: Light;

  // alpha particles inside zoomedInBox
  public readonly alphaParticles: ObservableArray<AlphaParticle>;

  // photons inside zoomedInBox
  public readonly photons: ObservableArray<Photon>;

  // is the simulation playing?
  public readonly isPlayingProperty: Property<boolean>;

  // speed that the simulation is running at
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  /**
   * @param zoomedInBox - the zoomed-in part of the box of hydrogen, where animation takes place
   * @param predictiveModels
   * @param initialPredictiveModel
   * @param providedOptions
   */
  public constructor( zoomedInBox: ZoomedInBox,
                      predictiveModels: HydrogenAtom[],
                      initialPredictiveModel: HydrogenAtom,
                      providedOptions: MOTHAModelOptions ) {

    assert && assert( predictiveModels.includes( initialPredictiveModel ) );

    const options = optionize<MOTHAModelOptions, SelfOptions>()( {
      //TODO
    }, providedOptions );

    this.zoomedInBox = zoomedInBox;

    //TODO default should be 'experiment'
    this.modelModeProperty = new StringEnumerationProperty( 'prediction', {
      validValues: ModelModeValues,
      tandem: options.tandem.createTandem( 'modelModeProperty' )
    } );

    this.experimentModel = new ExperimentModel( zoomedInBox, {
      tandem: options.tandem.createTandem( 'experimentModel' )
    } );

    this.predictiveModels = predictiveModels;

    this.predictiveModelProperty = new Property<HydrogenAtom>( initialPredictiveModel, {
      validValues: predictiveModels
      //TODO tandem
      //TODO phetioType
    } );

    this.hydrogenAtomProperty = new DerivedProperty(
      [ this.modelModeProperty, this.predictiveModelProperty ],
      ( modelMode, predictiveModel ) => ( modelMode === 'experiment' ) ? this.experimentModel : predictiveModel, {
        //TODO tandem
        //TODO phetioType
      } );

    this.light = new Light( zoomedInBox, {
      tandem: options.tandem.createTandem( 'light' )
    } );

    this.alphaParticles = createObservableArray<AlphaParticle>( {
      //TODO tandem
      //TODO phetioType
    } );

    this.photons = createObservableArray<Photon>( {
      //TODO tandem
      //TODO phetioType
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'isPlayingProperty' )
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: options.tandem.createTandem( 'timeSpeedProperty' )
    } );

    this.hydrogenAtomProperty.link( ( hydrogenAtom, oldHydrogenAtom ) => {
      if ( oldHydrogenAtom !== null ) {
        oldHydrogenAtom.reset();
      }
      this.alphaParticles.clear();
      this.photons.clear();
      hydrogenAtom.photonEmittedEmitter.addListener( this.photonEmittedListener.bind( this ) );
      hydrogenAtom.photonAbsorbedEmitter.addListener( this.photonAbsorbedListener.bind( this ) );
    } );

    this.light.photonCreatedEmitter.addListener( photon => {
      this.photons.add( photon );
      phet.log && phet.log( `photon created: ${photon.toString()}` );
    } );
  }

  public reset(): void {
    this.modelModeProperty.reset();
    this.experimentModel.reset();
    this.predictiveModels.forEach( predictiveModel => predictiveModel.reset() );
    this.predictiveModelProperty.reset();
    this.light.reset();
    while ( this.alphaParticles.length > 0 ) {
      this.alphaParticles.pop()!.dispose();
    }
    while ( this.photons.length > 0 ) {
      this.photons.pop()!.dispose();
    }
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
  }

  /**
   * Steps the model.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {
    this.light.step( dt );
    this.hydrogenAtomProperty.value.step( dt );
    this.moveAndCullParticles( dt );
  }

  /**
   * Moves photons and alpha particles. Particles that move outside the zoomed-in box are culled.
   * @param dt - the time step, in seconds
   */
  private moveAndCullParticles( dt: number ): void {

    const hydrogenAtom = this.hydrogenAtomProperty.value;

    // Move and cull photons. May change this.photons, so operate on a copy of the array.
    this.photons.getArrayCopy().forEach( photon => {
      hydrogenAtom.movePhoton( photon, dt );

      // If the photon leaves the zoomed-in box, cull it.
      if ( !this.zoomedInBox.containsPhoton( photon ) ) {
        photon.dispose();
        this.photons.remove( photon );
        phet.log && phet.log( `photon culled: ${photon.toString()}` );
      }
    } );

    // Move and cull alpha particles. May change this.alphaParticles, so operate on a copy of the array.
    this.alphaParticles.forEach( alphaParticle => {
      hydrogenAtom.moveAlphaParticle( alphaParticle, dt );

      // If the alpha particle leaves the zoomed-in box, cull it.
      if ( !this.zoomedInBox.containsAlphaParticle( alphaParticle ) ) {
        alphaParticle.dispose();
        this.alphaParticles.remove( alphaParticle );
        phet.log && phet.log( `alpha particle culled: ${alphaParticle.toString()}` );
      }
    } );
  }

  private photonEmittedListener( photon: Photon ): void {
    this.photons.add( photon );
    phet.log && phet.log( `photon emitted: ${photon.toString()}` );
  }

  private photonAbsorbedListener( photon: Photon ): void {
    this.photons.remove( photon );
    phet.log && phet.log( `photon absorbed: ${photon.toString()}` );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
export default MOTHAModel;