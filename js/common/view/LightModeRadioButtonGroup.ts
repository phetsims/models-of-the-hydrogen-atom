// Copyright 2024-2025, University of Colorado Boulder

/**
 * LightModeRadioButtonGroup is the radio button group for selecting 'white' or 'monochromatic' light mode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HorizontalAquaRadioButtonGroup from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';

const FONT = new PhetFont( 16 );

export default class LightModeRadioButtonGroup extends HorizontalAquaRadioButtonGroup<LightMode> {

  public constructor( lightModeProperty: Property<LightMode>, tandem: Tandem ) {

    const radioButtonGroupItems: AquaRadioButtonGroupItem<LightMode>[] = [
      {
        value: 'white',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.whiteStringProperty, {
          font: FONT,
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 45
        } ),
        tandemName: 'whiteRadioButton'
      },
      {
        value: 'monochromatic',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.monochromaticStringProperty, {
          font: FONT,
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 115
        } ),
        tandemName: 'monochromaticRadioButton'
      }
    ];

    super( lightModeProperty, radioButtonGroupItems, {
      isDisposable: false,
      spacing: 15,
      radioButtonOptions: {
        radius: new Text( 'X', { font: FONT } ).height / 2
      },
      mouseAreaYDilation: 5,
      touchAreaYDilation: 5,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.lightSourceModeRadioButtonGroup.accessibleNameStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.lightSourceModeRadioButtonGroup.helpTextStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'LightModeRadioButtonGroup', LightModeRadioButtonGroup );