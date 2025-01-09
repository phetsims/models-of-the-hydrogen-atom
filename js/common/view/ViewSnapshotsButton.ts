// Copyright 2024, University of Colorado Boulder

/**
 * ViewSnapshotsButton is the button on the spectrometer that opens a dialog to view snapshots that have been taken.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { Path } from '../../../../scenery/js/imports.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import Dialog from '../../../../sun/js/Dialog.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type ViewSnapshotsButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem' | 'size'>;

export default class ViewSnapshotsButton extends RectangularPushButton {

  public constructor( snapshotsDialog: Dialog, spectrometer: Spectrometer, providedOptions: ViewSnapshotsButtonOptions ) {

    const options = optionize<ViewSnapshotsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Path( eyeSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      listener: () => snapshotsDialog.show(),
      // Enabled when we have snapshots
      enabledProperty: new DerivedProperty( [ spectrometer.snapshots.lengthProperty ],
        numberOfSnapshots => ( numberOfSnapshots > 0 ), {
          tandem: providedOptions.tandem.createTandem( 'enabledProperty' ),
          phetioValueType: BooleanIO
        } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.viewSnapshotsButton.accessibleNameStringProperty
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ViewSnapshotsButton', ViewSnapshotsButton );