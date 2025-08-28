// Copyright 2024-2025, University of Colorado Boulder

/**
 * TransitionsCheckbox is the checkbox that shows the 'Transitions' dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import TransitionsDialog from './TransitionsDialog.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class TransitionsButton extends RectangularPushButton {

  public constructor( transitionsDialog: TransitionsDialog,
                      isQuantumAtomProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const text = new Text( ModelsOfTheHydrogenAtomStrings.transitionsStringProperty, {
      font: new PhetFont( 16 ),
      maxWidth: 200
    } );

    super( {
      content: text,
      listener: () => transitionsDialog.show(),
      enabledProperty: DerivedProperty.not( transitionsDialog.visibleProperty ),
      isDisposable: false,
      //TODO https://github.com/phetsims/sun/issues/928 accessibleName should be discoverable by sun buttons.
      accessibleName: ModelsOfTheHydrogenAtomStrings.transitionsStringProperty,
      accessibleHelpText: ModelsOfTheHydrogenAtomStrings.a11y.transitionsButton.accessibleHelpTextStringProperty,

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

modelsOfTheHydrogenAtom.register( 'TransitionsButton', TransitionsButton );