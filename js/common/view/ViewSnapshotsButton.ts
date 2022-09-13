// Copyright 2022, University of Colorado Boulder

/**
 * ViewSnapshotsButtonOptions is the push button labeled 'View Snapshots'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ViewSnapshotsButtonOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<RectangularPushButtonOptions, 'listener' | 'tandem'>;

export default class ViewSnapshotsButton extends RectangularPushButton {

  public constructor( numberOfSnapshotsProperty: TReadOnlyProperty<number>, providedOptions: ViewSnapshotsButtonOptions ) {
    super( optionize<ViewSnapshotsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {

      // RectangularPushButtonOptions
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Text( ModelsOfTheHydrogenAtomStrings.viewSnapshotsStringProperty, {
        font: new PhetFont( 16 ),
        tandem: providedOptions.tandem.createTandem( 'text' )
      } ),

      // Visible when we have snapshots
      visibleProperty: new DerivedProperty( [ numberOfSnapshotsProperty ], n => ( n > 0 ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } )
    }, providedOptions ) );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ViewSnapshotsButton', ViewSnapshotsButton );