// Copyright 2024, University of Colorado Boulder

/**
 * ViewSnapshotsButton is the button on the spectrometer that opens a dialog to view snapshots that have been taken.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import { Path } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import Dialog from '../../../../sun/js/Dialog.js';
import Spectrometer from '../model/Spectrometer.js';

export default class ViewSnapshotsButton extends RectangularPushButton {

  public constructor( snapshotsDialog: Dialog, spectrometer: Spectrometer, tandem: Tandem ) {
    super( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Path( eyeSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      listener: () => snapshotsDialog.show(),
      // Enabled when we have snapshots
      enabledProperty: new DerivedProperty( [ spectrometer.numberOfSnapshotsProperty ], n => ( n > 0 ), {
        tandem: tandem.createTandem( 'enabledProperty' ),
        phetioValueType: BooleanIO
      } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.viewSnapshotsStringProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ViewSnapshotsButton', ViewSnapshotsButton );