// Copyright 2024-2025, University of Colorado Boulder

/**
 * ViewSnapshotsButton is the button on the spectrometer that opens a dialog to view snapshots that have been taken.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import Dialog from '../../../../sun/js/Dialog.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ViewSnapshotsButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem' | 'size'>;

export default class ViewSnapshotsButton extends RectangularPushButton {

  public constructor( snapshotsDialog: Dialog, numberOfSnapshotsProperty: TReadOnlyProperty<number>, providedOptions: ViewSnapshotsButtonOptions ) {

    const options = optionize<ViewSnapshotsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {
      listener: () => snapshotsDialog.show(),
      baseColor: MOTHAColors.pushButtonColorProperty,
      content: new Path( eyeSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      // Enabled when we have snapshots
      enabledProperty: new DerivedProperty( [ numberOfSnapshotsProperty ], numberOfSnapshots => ( numberOfSnapshots > 0 ), {
        tandem: providedOptions.tandem.createTandem( 'enabledProperty' ),
        phetioValueType: BooleanIO
      } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.viewSnapshotsButton.accessibleNameStringProperty
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ViewSnapshotsButton', ViewSnapshotsButton );