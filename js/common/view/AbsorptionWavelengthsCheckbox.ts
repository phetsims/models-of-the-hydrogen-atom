// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionWavelengthsCheckbox is the checkbox that shows the 'Absorption Wavelengths' panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

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
import BohrModel from '../model/BohrModel.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Property from '../../../../axon/js/Property.js';
import MOTHAColors from '../MOTHAColors.js';

export default class AbsorptionWavelengthsCheckbox extends Checkbox {

  public constructor( absorptionWavelengthsPanelVisibleProperty: Property<boolean>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      tandem: Tandem ) {

    const text = new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
      font: new PhetFont( 12 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 200
    } );

    super( absorptionWavelengthsPanelVisibleProperty, text, {

      // CheckboxOptions
      isDisposable: false,

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

modelsOfTheHydrogenAtom.register( 'AbsorptionWavelengthsCheckbox', AbsorptionWavelengthsCheckbox );