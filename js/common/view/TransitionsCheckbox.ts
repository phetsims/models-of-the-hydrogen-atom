// Copyright 2024-2025, University of Colorado Boulder

/**
 * TransitionsCheckbox is the checkbox that shows the 'Transitions' dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

export default class TransitionsCheckbox extends Checkbox {

  public constructor( transitionsDialogVisibleProperty: Property<boolean>,
                      isQuantumAtomProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // Show this checkbox only for quantum atoms, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/63
    const visibleProperty = isQuantumAtomProperty;

    // Provides PhET-iO clients with a way to permanently hide this Node via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, tandem );

    const text = new Text( ModelsOfTheHydrogenAtomStrings.transitionsStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    super( transitionsDialogVisibleProperty, text, {
      isDisposable: false,
      boxWidth: text.height,
      checkboxColor: MOTHAColors.checkboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.checkboxFillProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.transitionsCheckbox.helpTextStringProperty,
      visibleProperty: gatedVisibleProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'TransitionsCheckbox', TransitionsCheckbox );