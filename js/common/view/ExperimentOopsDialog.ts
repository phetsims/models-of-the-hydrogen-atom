// Copyright 2025, University of Colorado Boulder

/**
 * ExperimentOopsDialog is a dialog that appears when the Experiment is selected and its electron is stuck in
 * the metastable state (n,l,m) = (2,0,0).  When the dialog is closed by the user, the light is switched to
 * 'white' mode, which cause an absorbable photon to be automatically fired at the atom. When this photon is
 * absorbed, the electron will move to a higher state.
 *
 * To test this, run with ?showHalos so that you can more-easily see the absorbable photon that is fired at
 * the atom. Set the A/B switch to 'Experiment'. Turn on the light source, set to 'Monochromatic' 94 nm.
 * Then wait for the electron to get stuck in the metastable state. Close the dialog, and observe that the
 * light source gets set to 'white', an absorbable photon is fired at the atom, and the electron moves to
 * a higher state.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import OopsDialog, { OopsDialogOptions } from '../../../../scenery-phet/js/OopsDialog.js';
import ElectronNode from './ElectronNode.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type ExperimentOopsDialogOptions = SelfOptions & PickRequired<OopsDialogOptions, 'hideCallback' | 'tandem'>;

export default class ExperimentOopsDialog extends OopsDialog {

  public constructor( providedOptions: ExperimentOopsDialogOptions ) {

    const options = optionize<ExperimentOopsDialogOptions, SelfOptions, OopsDialogOptions>()( {

      // OopsDialogOptions
      isDisposable: false,
      iconNode: ElectronNode.createIcon( 5 ),
      iconPosition: 'left',
      richTextOptions: {
        lineWrap: 300
      },
      leftMargin: 25,
      xSpacing: 24
      //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/105 accessibleName:
      //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/105 helpText:
    }, providedOptions );

    super( ModelsOfTheHydrogenAtomStrings.oopsTheElectronIsStuckStringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentOopsDialog', ExperimentOopsDialog );