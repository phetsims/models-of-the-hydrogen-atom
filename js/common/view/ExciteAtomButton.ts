// Copyright 2024, University of Colorado Boulder

//TODO Make it possible for PhET-iO to permanently hide ExciteAtomButton.
/**
 * ExciteAtomButton is the push button labeled 'Excite Atom'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;

type ExciteAtomButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>;

export default class ExciteAtomButton extends RectangularPushButton {

  public constructor( isMetastableStateProperty: TReadOnlyProperty<boolean>, excite: () => void, providedOptions: ExciteAtomButtonOptions ) {

    const options = optionize<ExciteAtomButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {

      // RectangularPushButtonOptions
      isDisposable: false,
      listener: () => excite(),
      baseColor: MOTHAColors.exciteAtomButtonColorProperty,
      visibleProperty: isMetastableStateProperty,
      content: new Text( ModelsOfTheHydrogenAtomStrings.exciteAtomStringProperty, {
        font: new PhetFont( 16 ),
        maxWidth: 100
      } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExciteAtomButton', ExciteAtomButton );