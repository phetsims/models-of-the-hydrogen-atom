// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionAndEmissionCheckbox is the checkbox that shows the 'Absorption and Emission' dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionAndEmissionCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class AbsorptionAndEmissionCheckbox extends Checkbox {

  public constructor( absorptionAndEmissionDialogVisibleProperty: Property<boolean>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      providedOptions: AbsorptionAndEmissionCheckboxOptions ) {

    // Show this checkbox only for quantum models, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/63
    const visibleProperty = isQuantumModelProperty;

    // Provide PhET-iO clients with a way to permanently hide this checkbox via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const text = new Text( ModelsOfTheHydrogenAtomStrings.absorptionAndEmissionStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    const options = optionize<AbsorptionAndEmissionCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      isDisposable: false,
      boxWidth: text.height,
      checkboxColor: MOTHAColors.checkboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.checkboxFillProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.absorptionAndEmissionCheckbox.helpTextStringProperty,
      visibleProperty: gatedVisibleProperty
    }, providedOptions );

    super( absorptionAndEmissionDialogVisibleProperty, text, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionAndEmissionCheckbox', AbsorptionAndEmissionCheckbox );