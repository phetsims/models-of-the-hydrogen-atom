// Copyright 2015-2022, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import { ModelMode } from '../model/ModelMode.js';

type SelfOptions = {};

type ExperimentPredictionSwitchOptions = SelfOptions & NodeTranslationOptions & PickRequired<ABSwitchOptions, 'tandem'>

class ExperimentPredictionSwitch extends ABSwitch<ModelMode> {

  constructor( modelModeProperty: IProperty<ModelMode>, providedOptions: ExperimentPredictionSwitchOptions ) {

    const options = optionize<ExperimentPredictionSwitchOptions, SelfOptions, ABSwitchOptions>()( {
      centerOnButton: true,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
    }, providedOptions );

    const labelOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.abSwitchTextFillProperty,
      maxWidth: 100
    };

    super( modelModeProperty,
      'experiment', new Text( modelsOfTheHydrogenAtomStrings.experiment, labelOptions ), //TODO instrument
      'prediction', new Text( modelsOfTheHydrogenAtomStrings.prediction, labelOptions ), //TODO instrument
      options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );
export default ExperimentPredictionSwitch;