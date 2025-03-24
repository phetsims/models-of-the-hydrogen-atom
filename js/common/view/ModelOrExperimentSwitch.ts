// Copyright 2015-2025, University of Colorado Boulder

/**
 * ModelOrExperimentSwitch is an A/B switch that determines whether we are viewing a predictive model or an experiment.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { ModelOrExperiment } from '../model/MOTHAModel.js';
import MOTHAColors from '../MOTHAColors.js';

const LABEL_FONT = new PhetFont( {
  size: 16,
  weight: 'bold'
} );

export default class ModelOrExperimentSwitch extends ABSwitch<ModelOrExperiment> {

  public constructor( modelOrExperimentProperty: StringUnionProperty<ModelOrExperiment>, tandem: Tandem ) {

    const modelText = new Text( ModelsOfTheHydrogenAtomStrings.modelStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.switchTextFillProperty,

      // Determined empirically in the Energy Levels screen, where there is less space for the switch.
      // Making modelText.maxWidth smaller than experimentText.maxWidth is wrong because it's English-centric.
      // But we are so tight on space in the Energy Levels screen that we don't have a choice.
      maxWidth: 50
    } );

    const experimentText = new Text( ModelsOfTheHydrogenAtomStrings.experimentStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.switchTextFillProperty,
      maxWidth: 90 // Determined empirically in the Energy Levels screen, where there is less space for the switch.
    } );

    super( modelOrExperimentProperty, 'model', modelText, 'experiment', experimentText, {
      isDisposable: false,
      centerOnSwitch: false,
      toggleSwitchOptions: {
        size: new Dimension2( 50, 25 ),
        thumbTouchAreaXDilation: 6,
        thumbTouchAreaYDilation: 6,
        phetioVisiblePropertyInstrumented: false,
        phetioEnabledPropertyInstrumented: false
      },
      accessibleHelpText: ModelsOfTheHydrogenAtomStrings.a11y.modelOrExperimentHelpTextSwitch.accessibleHelpTextStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ModelOrExperimentSwitch', ModelOrExperimentSwitch );