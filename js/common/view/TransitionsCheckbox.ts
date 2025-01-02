// Copyright 2024, University of Colorado Boulder

/**
 * TransitionsCheckbox is the checkbox that shows the 'Transitions' dialog.
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

type TransitionsCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class TransitionsCheckbox extends Checkbox {

  public constructor( transitionsDialogVisibleProperty: Property<boolean>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      providedOptions: TransitionsCheckboxOptions ) {

    // Show this checkbox only for quantum models, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/63
    const visibleProperty = isQuantumModelProperty;

    // Provide PhET-iO clients with a way to permanently hide this checkbox via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const text = new Text( ModelsOfTheHydrogenAtomStrings.transitionsStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    const options = optionize<TransitionsCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      isDisposable: false,
      boxWidth: text.height,
      checkboxColor: MOTHAColors.checkboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.checkboxFillProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.transitionsCheckbox.helpTextStringProperty,
      visibleProperty: gatedVisibleProperty
    }, providedOptions );

    super( transitionsDialogVisibleProperty, text, options );
  }
}

modelsOfTheHydrogenAtom.register( 'TransitionsCheckbox', TransitionsCheckbox );