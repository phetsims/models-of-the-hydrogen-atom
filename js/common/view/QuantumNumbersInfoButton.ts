// Copyright 2024, University of Colorado Boulder

/**
 * QuantumNumbersInfoButton is an info button that, when pressed, shows a dialog that explains the Schrodinger
 * state notation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import QuantumNumbersInfoDialog from './QuantumNumbersInfoDialog.js';

export default class QuantumNumbersInfoButton extends InfoButton {

  public constructor( dialog: QuantumNumbersInfoDialog, tandem: Tandem ) {
    super( {
      scale: 0.5,
      iconFill: MOTHAColors.stateInfoButtonFillProperty,
      listener: () => dialog.show(),
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.quantumNumbersInfoButton.helpTextStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'QuantumNumbersInfoButton', QuantumNumbersInfoButton );