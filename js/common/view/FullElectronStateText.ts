// Copyright 2022, University of Colorado Boulder

/**
 * FullElectronStateText displays the full state (n,l,m) of the electron, used for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

type SelfOptions = EmptySelfOptions;

type FullElectronStateNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class FullElectronStateText extends RichText {

  public constructor( primaryStateProperty: TReadOnlyProperty<number>,
                      secondaryStateProperty: TReadOnlyProperty<number>,
                      tertiaryStateProperty: TReadOnlyProperty<number>,
                      providedOptions: FullElectronStateNodeOptions ) {

    const options = optionize<FullElectronStateNodeOptions, SelfOptions, RichTextOptions>()( {

      // TextOptions
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty
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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'FullElectronStateText', FullElectronStateText );