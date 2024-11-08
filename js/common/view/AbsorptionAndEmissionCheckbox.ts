// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionAndEmissionCheckbox is the checkbox that shows the 'Absorption and Emission' dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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

    //TODO Would GatedVisibleProperty be useful here?
    const visibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
      phetioDocumentation: 'Set this to false to permanently hide the "Absorption/Emission" checkbox. ' +
                           'Otherwise, visibility depends on the selected hydrogen atom model.',
      phetioFeatured: true
    } );

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
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.absorptionAndEmissionHelpTextStringProperty,

      // Show this checkbox only for quantum models, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/63
      visibleProperty: new DerivedProperty( [ isQuantumModelProperty, visibleProperty ],
        ( isQuantumModel, visible ) => isQuantumModel && visible )
    }, providedOptions );

    super( absorptionAndEmissionDialogVisibleProperty, text, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionAndEmissionCheckbox', AbsorptionAndEmissionCheckbox );