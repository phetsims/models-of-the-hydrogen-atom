// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionEmissionCheckbox is the checkbox that shows the 'Absorption Wavelengths' panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Property from '../../../../axon/js/Property.js';
import MOTHAColors from '../MOTHAColors.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionEmissionCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class AbsorptionEmissionCheckbox extends Checkbox {

  public constructor( absorptionEmissionDialogVisibleProperty: Property<boolean>, providedOptions: AbsorptionEmissionCheckboxOptions ) {

    const options = optionize<AbsorptionEmissionCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      isDisposable: false
    }, providedOptions );

    const text = new Text( ModelsOfTheHydrogenAtomStrings.absorptionEmissionStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    super( absorptionEmissionDialogVisibleProperty, text, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionEmissionCheckbox', AbsorptionEmissionCheckbox );