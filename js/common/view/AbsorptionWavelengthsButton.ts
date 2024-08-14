// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionWavelengthsButton is the button that opens the 'Absorption Wavelengths' dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Dialog from '../../../../sun/js/Dialog.js';
import BohrModel from '../model/BohrModel.js';

export default class AbsorptionWavelengthsButton extends RectangularPushButton {

  public constructor( lightModeProperty: TReadOnlyProperty<LightMode>,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      absorptionWavelengthsDialog: Dialog,
                      tandem: Tandem ) {
    super( {

      // RectangularPushButtonOptions
      isDisposable: false,
      content: new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
        font: new PhetFont( 12 ),
        maxWidth: 200
      } ),
      listener: () => absorptionWavelengthsDialog.show(),

      //TODO Why is Absorption Wavelengths not relevant for white light?
      visibleProperty: new DerivedProperty( [ lightModeProperty, hydrogenAtomProperty ],
        ( lightMode, hydrogenAtom ) => ( lightMode === 'monochromatic' ) && ( hydrogenAtom instanceof BohrModel ), {
          phetioValueType: BooleanIO,
          tandem: tandem.createTandem( 'visibleProperty' )
        } ),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionWavelengthsButton', AbsorptionWavelengthsButton );