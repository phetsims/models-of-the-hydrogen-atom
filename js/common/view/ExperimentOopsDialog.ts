// Copyright 2025, University of Colorado Boulder

/**
 * ExperimentOopsDialog is a dialog that appears when the Experiment is selected and its electron is stuck in
 * the metastable state (n,l,m) = (2,0,0).
 * See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/105 for feature history.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import OopsDialog, { OopsDialogOptions } from '../../../../scenery-phet/js/OopsDialog.js';
import ElectronNode from './ElectronNode.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

const TITLE_FONT = new PhetFont( {
  size: 24,
  weight: 'bold'
} );

type SelfOptions = EmptySelfOptions;

type ExperimentOopsDialogOptions = SelfOptions & PickRequired<OopsDialogOptions, 'hideCallback' | 'tandem'>;

export default class ExperimentOopsDialog extends OopsDialog {

  public constructor( providedOptions: ExperimentOopsDialogOptions ) {

    const options = optionize<ExperimentOopsDialogOptions, SelfOptions, OopsDialogOptions>()( {

      // OopsDialogOptions
      title: new Text( ModelsOfTheHydrogenAtomStrings.experimentOopsDialogTitleStringProperty, {
        font: TITLE_FONT,
        maxWidth: 300
      } ),
      isDisposable: false,
      iconNode: ElectronNode.createIcon( 5 ),
      iconPosition: 'left',
      richTextOptions: {
        lineWrap: 400,
        maxHeight: 200 // lineWrap takes care of maxWidth
      },
      leftMargin: 25,
      xSpacing: 24
    }, providedOptions );

    super( ModelsOfTheHydrogenAtomStrings.experimentOopsDialogMessageStringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentOopsDialog', ExperimentOopsDialog );