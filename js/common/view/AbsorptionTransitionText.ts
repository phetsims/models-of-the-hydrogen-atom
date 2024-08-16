// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import MOTHASymbols from '../MOTHASymbols.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BohrModel from '../model/BohrModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionTransitionTextOptions = SelfOptions & PickOptional<RichTextOptions, 'visibleProperty'> &
  PickRequired<RichTextOptions, 'tandem'>;

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>, providedOptions: AbsorptionTransitionTextOptions ) {

    const options = optionize<AbsorptionTransitionTextOptions, SelfOptions, RichTextOptions>()( {

      // RichTextOptions
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      phetioVisiblePropertyInstrumented: true
    }, providedOptions );

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

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionTransitionText', AbsorptionTransitionText );