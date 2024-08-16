// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionTransitionDisplay displays the electron state transition (possibly undefined) associated with a wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { RichText } from '../../../../scenery/js/imports.js';
import MOTHASymbols from '../MOTHASymbols.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BohrModel from '../model/BohrModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

export default class AbsorptionTransitionDisplay extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>, tandem: Tandem ) {

    const stringProperty = new DerivedStringProperty( [ MOTHASymbols.nStringProperty, wavelengthProperty ],
      ( n, wavelength ) => {
        const transition = BohrModel.wavelengthToStateTransitionMap.get( wavelength );
        if ( transition ) {
          return `${n} = ${transition.n1} ${MOTHASymbols.rightArrow} ${transition.n2}`;
        }
        else {
          return '';
        }
      } );

    super( stringProperty, {
      font: new PhetFont( 12 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionTransitionDisplay', AbsorptionTransitionDisplay );