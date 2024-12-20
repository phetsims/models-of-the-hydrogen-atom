// Copyright 2024, University of Colorado Boulder

/**
 * SnapshotButton is the button on the spectrometer that takes a snapshot.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { Path } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

export default class SnapshotButton extends RectangularPushButton {

  public constructor( spectrometer: Spectrometer, tandem: Tandem ) {
    super( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Path( cameraSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      listener: () => {
        spectrometer.createSnapshot();
      },
      enabledProperty: new DerivedProperty( [ spectrometer.snapshots.lengthProperty ],
        numberOfSnapshots => numberOfSnapshots < MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, {
          tandem: tandem.createTandem( 'enabledProperty' ),
          phetioValueType: BooleanIO
        } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.snapshotButton.accessibleNameStringProperty,
      helpText: new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.snapshotButton.helpTextStringProperty, {
        max: MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS
      } ),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SnapshotButton', SnapshotButton );