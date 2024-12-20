// Copyright 2024, University of Colorado Boulder

/**
 * ExciteAtomButton is the push button labeled 'Excite Atom'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
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

type SelfOptions = EmptySelfOptions;

type ExciteAtomButtonOptions = SelfOptions & PickRequired<RectangularPushButtonOptions, 'tandem'>;

export default class ExciteAtomButton extends RectangularPushButton {

  public constructor( isMetastableStateProperty: TReadOnlyProperty<boolean>,
                      light: Light,
                      excite: () => void, providedOptions: ExciteAtomButtonOptions ) {

    //TODO Would GatedVisibleProperty be useful here?
    const visibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
      phetioDocumentation: 'Set this to false to permanently hide the "Excite Atom" button. ' +
                           'Otherwise, visibility depends on whether the electron is in the metastable state (2,0,0).',
      phetioFeatured: true
    } );

    const options = optionize<ExciteAtomButtonOptions, SelfOptions, RectangularPushButtonOptions>()( {

      // RectangularPushButtonOptions
      isDisposable: false,
      listener: () => excite(),
      baseColor: MOTHAColors.exciteAtomButtonColorProperty,

      // Visible when we're in state (2,0,0) with the light on, in 'monochromatic' mode.
      // When the light is in 'white' mode, MetastableHandler automatically fires absorbable photons.
      visibleProperty: new DerivedProperty(
        [ visibleProperty, isMetastableStateProperty, light.isOnProperty, light.lightModeProperty ],
        ( visible, isMetastableState, lightIsOn, lightMode ) =>
          ( visible && isMetastableState && lightIsOn && lightMode === 'monochromatic' ) ),
      content: new Text( ModelsOfTheHydrogenAtomStrings.exciteAtomStringProperty, {
        font: new PhetFont( 16 ),
        maxWidth: 100
      } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExciteAtomButton', ExciteAtomButton );