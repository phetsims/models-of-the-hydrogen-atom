// Copyright 2015-2020, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

const experimentString = modelsOfTheHydrogenAtomStrings.experiment;
const predictionString = modelsOfTheHydrogenAtomStrings.prediction;

class ExperimentPredictionSwitch extends ABSwitch {

  /**
   * @param {BooleanProperty} experimentEnabledProperty
   * @param {Object} [options]
   */
  constructor( experimentEnabledProperty, options ) {

    options = merge( {
      centerOnButton: true,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
    }, options );

    const labelOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.abSwitchTextFillProperty,
      maxWidth: 100
    };

    super( experimentEnabledProperty,
      true, new Text( experimentString, labelOptions ),
      false, new Text( predictionString, labelOptions ),
      options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );
export default ExperimentPredictionSwitch;