// Copyright 2015-2025, University of Colorado Boulder

/**
 * ExperimentModelSwitch is an A/B switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const LABEL_FONT = new PhetFont( {
  size: 16,
  weight: 'bold'
} );

export default class ExperimentModelSwitch extends ABSwitch<boolean> {

  public constructor( isExperimentProperty: Property<boolean>, tandem: Tandem ) {

    const experimentText = new Text( ModelsOfTheHydrogenAtomStrings.experimentStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.switchTextFillProperty,
      maxWidth: 90 // determined empirically in the Energy Levels screen
    } );

    const modelText = new Text( ModelsOfTheHydrogenAtomStrings.modelStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.switchTextFillProperty,

      // Determined empirically in the Energy Levels screen.
      // Making modelText.maxWidth smaller than experimentText.maxWidth is wrong because it's English-centric.
      // But we are so tight on space in the Energy Levels screen that we don't have a choice.
      maxWidth: 50
    } );

    super( isExperimentProperty, true, experimentText, false, modelText, {
      isDisposable: false,
      centerOnSwitch: false,
      toggleSwitchOptions: {
        size: new Dimension2( 50, 25 ),
        phetioVisiblePropertyInstrumented: false,
        phetioEnabledPropertyInstrumented: false
      },
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.experimentOrModelHelpTextSwitch.helpTextStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentModelSwitch', ExperimentModelSwitch );