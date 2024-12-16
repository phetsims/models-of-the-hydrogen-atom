// Copyright 2015-2024, University of Colorado Boulder

/**
 * ExperimentModelSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

const LABEL_FONT = new PhetFont( { size: 16, weight: 'bold' } );

type SelfOptions = EmptySelfOptions;

type ExperimentModelSwitchOptions = SelfOptions & NodeTranslationOptions & PickRequired<ABSwitchOptions, 'tandem'>;

export default class ExperimentModelSwitch extends ABSwitch<boolean> {

  public constructor( isExperimentProperty: Property<boolean>, providedOptions: ExperimentModelSwitchOptions ) {

    const options = optionize<ExperimentModelSwitchOptions, SelfOptions, ABSwitchOptions>()( {

      // ABSwitchOptions
      isDisposable: false,
      centerOnSwitch: false,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) },
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.experimentOrModelHelpTextSwitch.helpTextStringProperty
    }, providedOptions );

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
      maxWidth: 90
    } );
    console.log( experimentText.width );
    console.log( modelText.width );

    super( isExperimentProperty, true, experimentText, false, modelText, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentModelSwitch', ExperimentModelSwitch );