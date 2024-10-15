// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerStateInfoButton is an info button that, when pressed, shows a dialog that explains the Schrodinger
 * state notation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../MOTHAColors.js';
import SchrodingerStateInfoDialog from './SchrodingerStateInfoDialog.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

export default class SchrodingerStateInfoButton extends InfoButton {

  public constructor( dialog: SchrodingerStateInfoDialog, tandem: Tandem ) {
    super( {
      scale: 0.5,
      iconFill: MOTHAColors.stateInfoButtonFillProperty,
      listener: () => dialog.show(),
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.infoHelpTextStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerStateInfoButton', SchrodingerStateInfoButton );