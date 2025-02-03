// Copyright 2024-2025, University of Colorado Boulder

/**
 * SnapshotButton is the button on the spectrometer that takes a snapshot.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { Path } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type SnapshotButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem' | 'size'>;

export default class SnapshotButton extends RectangularPushButton {

  public constructor( spectrometer: Spectrometer, providedOptions: SnapshotButtonOptions ) {

    const options = optionize<SnapshotButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {
      listener: () => spectrometer.takeSnapshot(),
      baseColor: MOTHAColors.pushButtonColorProperty,
      content: new Path( cameraSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      enabledProperty: new DerivedProperty( [ spectrometer.snapshots.lengthProperty ],
        numberOfSnapshots => numberOfSnapshots < MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, {
          tandem: providedOptions.tandem.createTandem( 'enabledProperty' ),
          phetioValueType: BooleanIO
        } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.snapshotButton.accessibleNameStringProperty,
      helpText: new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.snapshotButton.helpTextStringProperty, {
        max: MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS
      } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'SnapshotButton', SnapshotButton );