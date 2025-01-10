// Copyright 2024-2025, University of Colorado Boulder

/**
 * ExciteAtomButton is the push button labeled 'Excite Atom'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton, { RectangularPushButtonOptions } from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Light from '../model/Light.js';
import MOTHAColors from '../MOTHAColors.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';

type SelfOptions = EmptySelfOptions;

type ExciteAtomButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>;

export default class ExciteAtomButton extends RectangularPushButton {

  public constructor( isMetastableStateProperty: TReadOnlyProperty<boolean>,
                      light: Light,
                      excite: () => void, providedOptions: ExciteAtomButtonOptions ) {

    // Visible when we're in state (2,0,0) with the light on, in 'monochromatic' mode.
    // When the light is in 'white' mode, MetastableHandler automatically fires absorbable photons.
    const visibleProperty = new DerivedProperty(
      [ isMetastableStateProperty, light.isOnProperty, light.lightModeProperty ],
      ( isMetastableState, lightIsOn, lightMode ) =>
        ( isMetastableState && lightIsOn && lightMode === 'monochromatic' ) );

    // Provide PhET-iO clients with a way to permanently hide this button via 'selfVisibleProperty'.
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const options = optionize<ExciteAtomButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {

      // RectangularPushButtonOptions
      listener: () => excite(),
      isDisposable: false,
      baseColor: MOTHAColors.exciteAtomButtonColorProperty,
      visibleProperty: gatedVisibleProperty,
      content: new Text( ModelsOfTheHydrogenAtomStrings.exciteAtomStringProperty, {
        font: new PhetFont( 16 ),
        maxWidth: 100
      } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExciteAtomButton', ExciteAtomButton );