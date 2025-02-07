// Copyright 2024-2025, University of Colorado Boulder

/**
 * ExciteElectronButton is the push button labeled 'Excite Electron'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import LightSource from '../model/LightSource.js';
import MOTHAColors from '../MOTHAColors.js';

export default class ExciteElectronButton extends RectangularPushButton {

  public constructor( isMetastableStateProperty: TReadOnlyProperty<boolean>,
                      lightSource: LightSource,
                      excite: () => void,
                      tandem: Tandem ) {

    // Visible when we're in state (2,0,0) with the light source on, in 'monochromatic' mode.
    // When the light source is in 'white' mode, MetastableHandler automatically fires absorbable photons.
    const visibleProperty = new DerivedProperty(
      [ isMetastableStateProperty, lightSource.isOnProperty, lightSource.lightModeProperty ],
      ( isMetastableState, lightIsOn, lightMode ) =>
        ( isMetastableState && lightIsOn && lightMode === 'monochromatic' ) );

    // Provides PhET-iO clients with a way to permanently hide this Node via 'selfVisibleProperty'.
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, tandem, {
      phetioDocumentation: 'This button is visible when the atom is stuck in the metastable state (n,l,m) = (2,0,0).'
    } );

    super( {
      listener: () => excite(),
      isDisposable: false,
      baseColor: MOTHAColors.exciteElectronButtonColorProperty,
      visibleProperty: gatedVisibleProperty,
      content: new Text( ModelsOfTheHydrogenAtomStrings.exciteElectronStringProperty, {
        font: new PhetFont( 16 ),
        maxWidth: 100
      } ),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ExciteElectronButton', ExciteElectronButton );