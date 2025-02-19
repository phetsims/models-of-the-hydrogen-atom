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

    const text = new Text( ModelsOfTheHydrogenAtomStrings.transitionsStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    super( transitionsDialogVisibleProperty, text, {
      isDisposable: false,
      boxWidth: text.height, // PhET convention is to size the square box to match the height of the text.
      checkboxColor: MOTHAColors.checkboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.checkboxFillProperty,
      accessibleHelpText: ModelsOfTheHydrogenAtomStrings.a11y.translatable.transitionsCheckbox.accessibleHelpTextStringProperty,

      // Show only for quantum atoms, and provide a way for PhET-iO clients to permanently hide.
      visibleProperty: new GatedVisibleProperty( isQuantumAtomProperty, tandem ),
      mouseAreaXDilation: 5,
      mouseAreaYDilation: 5,
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'TransitionsCheckbox', TransitionsCheckbox );