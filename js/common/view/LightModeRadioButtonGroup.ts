// Copyright 2024, University of Colorado Boulder

/**
 * LightModeRadioButtonGroup is the radio button group for selecting 'white' or 'monochromatic' light mode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import HorizontalAquaRadioButtonGroup, { HorizontalAquaRadioButtonGroupOptions } from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import { LightMode } from '../model/LightMode.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import MOTHAColors from '../MOTHAColors.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';

const TEXT_OPTIONS = {
  font: new PhetFont( 16 ),
  fill: MOTHAColors.invertibleTextFillProperty,
  maxWidth: 110
};

type SelfOptions = EmptySelfOptions;

type LightModeRadioButtonGroupOptions = SelfOptions &
  PickOptional<HorizontalAquaRadioButtonGroupOptions, 'maxWidth'> &
  PickRequired<HorizontalAquaRadioButtonGroupOptions, 'tandem'>;

export default class LightModeRadioButtonGroup extends HorizontalAquaRadioButtonGroup<LightMode> {

  public constructor( lightModeProperty: Property<LightMode>, providedOptions: LightModeRadioButtonGroupOptions ) {

    const options = optionize<LightModeRadioButtonGroupOptions, SelfOptions, HorizontalAquaRadioButtonGroupOptions>()( {

      // HorizontalAquaRadioButtonGroupOptions
      isDisposable: false,
      spacing: 15
    }, providedOptions );

    const radioButtonGroupItems: AquaRadioButtonGroupItem<LightMode>[] = [
      {
        value: 'white',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.whiteStringProperty, TEXT_OPTIONS ),
        tandemName: 'whiteRadioButton'
      },
      {
        value: 'monochromatic',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.monochromaticStringProperty, TEXT_OPTIONS ),
        tandemName: 'monochromaticRadioButton'
      }
    ];

    super( lightModeProperty, radioButtonGroupItems, options );
  }
}

modelsOfTheHydrogenAtom.register( 'LightModeRadioButtonGroup', LightModeRadioButtonGroup );