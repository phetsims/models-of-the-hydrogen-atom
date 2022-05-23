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
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from './Light.js';
import HydrogenAtomModel from './HydrogenAtomModel.js';
import Space from './Space.js';
import Photon from './Photon.js';
import AlphaParticle from './AlphaParticle.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import ExperimentModel from './ExperimentModel.js';
import { ModelMode, ModelModeValues } from './ModelMode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {};

export type MOTHAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class MOTHAModel {

  public readonly modelModeProperty: Property<ModelMode>;

  public readonly experimentModel: ExperimentModel;

  // the supported set of predictive models
  public readonly predictiveModels: HydrogenAtomModel[];

  public readonly predictiveModelProperty: Property<HydrogenAtomModel>;

  // which predictive model is selected
  public readonly hydrogenAtomModelProperty: Property<HydrogenAtomModel>;

  public readonly space: Space;

  public readonly light: Light;

  public readonly photons: ObservableArray<Photon>;

  public readonly alphaParticles: ObservableArray<AlphaParticle>;

  // is the simulation playing?
  public readonly isPlayingProperty: Property<boolean>;

  // speed that the simulation is running at
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  constructor( predictiveModels: HydrogenAtomModel[], initialPredictiveModel: HydrogenAtomModel, providedOptions: MOTHAModelOptions ) {

    const options = optionize<MOTHAModelOptions, SelfOptions>()( {
      //TODO
    }, providedOptions );

    this.modelModeProperty = new StringEnumerationProperty( 'experiment', {
      validValues: ModelModeValues,
      tandem: options.tandem.createTandem( 'modelModeProperty' )
    } );

    this.experimentModel = new ExperimentModel( {
      tandem: options.tandem.createTandem( 'experimentModel' )
    } );

    this.predictiveModels = predictiveModels;

    this.predictiveModelProperty = new Property<HydrogenAtomModel>( initialPredictiveModel, {
      validValues: predictiveModels
      //TODO tandem
      //TODO phetioType
    } );

    this.hydrogenAtomModelProperty = new DerivedProperty(
      [ this.modelModeProperty, this.predictiveModelProperty ],
      ( modelMode, predictiveModel ) => ( modelMode === 'experiment' ) ? this.experimentModel : predictiveModel, {
        //TODO tandem
        //TODO phetioType
      } );

    this.space = new Space( new Dimension2( 500, 500 ) );

    this.light = new Light( {
      tandem: options.tandem.createTandem( 'light' )
    } );

    this.photons = createObservableArray<Photon>( {
      //TODO tandem
      //TODO phetioType
    } );

    this.alphaParticles = createObservableArray<AlphaParticle>( {
      //TODO tandem
      //TODO phetioType
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'isPlayingProperty' )
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: options.tandem.createTandem( 'timeSpeedProperty' )
    } );
  }

  public reset(): void {
    this.modelModeProperty.reset();
    this.experimentModel.reset();
    this.predictiveModels.forEach( predictiveModel => predictiveModel.reset() );
    this.predictiveModelProperty.reset();
    this.light.reset();
    this.photons.clear();
    this.alphaParticles.clear();
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
  }

  public step( dt: number ): void {
    this.hydrogenAtomModelProperty.value.step( dt );
    this.moveParticles( dt );
    this.cullParticles();
  }

  /**
   * Moves photons and alpha particles.
   */
  private moveParticles( dt: number ): void {

    const hydrogenAtomModel = this.hydrogenAtomModelProperty.value;

    // Move photons
    for ( let i = 0; i < this.photons.length; i++ ) {
      hydrogenAtomModel.stepPhoton( this.photons.get( i )!, dt ); //TODO does this potentially change this.photons?
    }

    // Move alpha particles
    for ( let i = 0; i < this.alphaParticles.length; i++ ) {
      hydrogenAtomModel.stepAlphaParticle( this.alphaParticles.get( i )!, dt ); //TODO does this potentially change this.alphaParticles?
    }
  }

  /**
   * Culls photons and alpha particles that have left the bounds of space.
   */
  private cullParticles(): void {

    // Changes this.photons, so operate on a copy of the array.
    this.photons.getArrayCopy().forEach( photon => {
      if ( !this.space.containsPhoton( photon ) ) {
        photon.dispose();
        this.photons.remove( photon );
      }
    } );

    // Changes this.alphaParticles, so operate on a copy of the array.
    this.alphaParticles.getArrayCopy().forEach( alphaParticle => {
      if ( !this.space.containsAlphaParticle( alphaParticle ) ) {
        alphaParticle.dispose();
        this.alphaParticles.remove( alphaParticle );
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
export default MOTHAModel;