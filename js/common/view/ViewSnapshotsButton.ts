// Copyright 2022, University of Colorado Boulder

/**
 * ViewSnapshotsButtonOptions is the push button labeled 'View Snapshots'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';

type SelfOptions = {};

type ViewSnapshotsButtonOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<RectangularPushButtonOptions, 'listener' | 'tandem'>;

export default class ViewSnapshotsButton extends RectangularPushButton {

  public constructor( providedOptions: ViewSnapshotsButtonOptions ) {
    super( optionize<ViewSnapshotsButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {

      // RectangularPushButtonOptions
      content: new Text( modelsOfTheHydrogenAtomStrings.viewSnapshots, {
        font: new PhetFont( 16 )
      } )
    }, providedOptions ) );
  }
}

modelsOfTheHydrogenAtom.register( 'ViewSnapshotsButton', ViewSnapshotsButton );