// Copyright 2022-2024, University of Colorado Boulder

/**
 * FullElectronStateText displays the full state (n,l,m) of the electron, used for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type FullElectronStateTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class FullElectronStateText extends RichText {

  public constructor( primaryStateProperty: TReadOnlyProperty<number>,
                      secondaryStateProperty: TReadOnlyProperty<number>,
                      tertiaryStateProperty: TReadOnlyProperty<number>,
                      providedOptions: FullElectronStateTextOptions ) {

    const options = optionize<FullElectronStateTextOptions, SelfOptions, RichTextOptions>()( {

      // RichTextOptions
      isDisposable: false,
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty,
      maxWidth: 200,
      phetioVisiblePropertyInstrumented: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty, {
      nSymbol: MOTHASymbols.nStringProperty,
      nValue: primaryStateProperty,
      lSymbol: MOTHASymbols.lStringProperty,
      lValue: secondaryStateProperty,
      mSymbol: MOTHASymbols.mStringProperty,
      mValue: tertiaryStateProperty
    } );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'FullElectronStateText', FullElectronStateText );