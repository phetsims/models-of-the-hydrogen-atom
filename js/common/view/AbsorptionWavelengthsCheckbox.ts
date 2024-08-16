// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionWavelengthsCheckbox is the checkbox that shows the 'Absorption Wavelengths' panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Property from '../../../../axon/js/Property.js';
import MOTHAColors from '../MOTHAColors.js';

export default class AbsorptionWavelengthsCheckbox extends Checkbox {

  public constructor( absorptionWavelengthsPanelVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const text = new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    super( absorptionWavelengthsPanelVisibleProperty, text, {

      // CheckboxOptions
      isDisposable: false,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionWavelengthsCheckbox', AbsorptionWavelengthsCheckbox );