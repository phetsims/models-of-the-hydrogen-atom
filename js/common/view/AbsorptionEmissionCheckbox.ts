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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionEmissionCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class AbsorptionEmissionCheckbox extends Checkbox {

  public constructor( absorptionEmissionDialogVisibleProperty: Property<boolean>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      providedOptions: AbsorptionEmissionCheckboxOptions ) {

    //TODO Would GatedVisibleProperty be useful here?
    const visibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
      phetioDocumentation: 'Set this to false to permanently hide the "Absorption/Emission" checkbox. ' +
                           'Otherwise, visibility depends on the selected hydrogen atom model.',
      phetioFeatured: true
    } );

    const options = optionize<AbsorptionEmissionCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      isDisposable: false,
      checkboxColor: MOTHAColors.checkboxColorProperty,
      checkboxColorBackground: MOTHAColors.checkboxColorBackgroundProperty,

      // Show this checkbox only for quantum models, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/63
      visibleProperty: new DerivedProperty( [ isQuantumModelProperty, visibleProperty ],
        ( isQuantumModel, visible ) => isQuantumModel && visible )
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