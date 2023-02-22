// Copyright 2015-2023, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import { ModelMode } from '../model/ModelMode.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = EmptySelfOptions;

type ExperimentPredictionSwitchOptions = SelfOptions & NodeTranslationOptions & PickRequired<ABSwitchOptions, 'tandem'>;

export default class ExperimentPredictionSwitch extends ABSwitch<ModelMode> {

  public constructor( modelModeProperty: Property<ModelMode>, providedOptions: ExperimentPredictionSwitchOptions ) {

    const options = optionize<ExperimentPredictionSwitchOptions, SelfOptions, ABSwitchOptions>()( {
      centerOnSwitch: true,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
    }, providedOptions );

    const labelOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.switchTextFillProperty,
      maxWidth: 100
    };

    const experimentText = new Text( ModelsOfTheHydrogenAtomStrings.experimentStringProperty,
      optionize<TextOptions, EmptySelfOptions, TextOptions>()( {
        tandem: options.tandem.createTandem( 'experimentText' )
      }, labelOptions ) );

    const predictionText = new Text( ModelsOfTheHydrogenAtomStrings.predictionStringProperty,
      optionize<TextOptions, EmptySelfOptions, TextOptions>()( {
        tandem: options.tandem.createTandem( 'predictionText' )
      }, labelOptions ) );

    super( modelModeProperty, 'experiment', experimentText, 'prediction', predictionText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );