// Copyright 2015-2022, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from './Light.js';
import PredictiveModel from './PredictiveModel.js';

type SelfOptions = {};

export type MOTHAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class MOTHAModel {

  // the supported set of  predictive models
  public readonly predictiveModels: PredictiveModel[];

  // which predictive model is selected
  public readonly predictiveModelProperty: Property<any>;

  public readonly light: Light;

  // is the simulation playing?
  public readonly isPlayingProperty: Property<boolean>;

  // speed that the simulation is running at
  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  constructor( predictiveModels: PredictiveModel[], initialPredictiveModel: PredictiveModel, providedOptions: MOTHAModelOptions ) {

    const options = optionize<MOTHAModelOptions, SelfOptions>()( {
      //TODO
    }, providedOptions );

    this.predictiveModels = predictiveModels;

    this.predictiveModelProperty = new Property<PredictiveModel>( initialPredictiveModel, {
      validValues: predictiveModels
      //TODO tandem
      //TODO phetioType
    } );

    this.light = new Light( {
      tandem: options.tandem.createTandem( 'light' )
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'isPlayingProperty' )
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: options.tandem.createTandem( 'timeSpeedProperty' )
    } );
  }

  public reset(): void {
    this.predictiveModelProperty.reset();
    this.light.reset();
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
  }

  public step( dt: number ): void {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
export default MOTHAModel;