// Copyright 2015-2021, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {};

type ExperimentPredictionSwitchOptions = SelfOptions & Omit<ABSwitchOptions, 'centerOnButton' | 'toggleSwitchOptions'>;

class ExperimentPredictionSwitch extends ABSwitch<boolean> {

  constructor( experimentEnabledProperty: IProperty<boolean>, providedOptions?: ExperimentPredictionSwitchOptions ) {

    const options = optionize<ExperimentPredictionSwitchOptions, SelfOptions, ABSwitchOptions>( {
      centerOnButton: true,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
    }, providedOptions );

    const labelOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.abSwitchTextFillProperty,
      maxWidth: 100
    };

    super( experimentEnabledProperty,
      true, new Text( modelsOfTheHydrogenAtomStrings.experiment, labelOptions ),
      false, new Text( modelsOfTheHydrogenAtomStrings.prediction, labelOptions ),
      options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );
export default ExperimentPredictionSwitch;