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
import { NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
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
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) },
      isDisposable: false
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.switchTextFillProperty,
      maxWidth: 100
    };

    const experimentText = new Text( ModelsOfTheHydrogenAtomStrings.experimentStringProperty, textOptions );

    const predictionText = new Text( ModelsOfTheHydrogenAtomStrings.predictionStringProperty, textOptions );

    super( modelModeProperty, 'experiment', experimentText, 'prediction', predictionText, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );