// Copyright 2022-2023, University of Colorado Boulder

/**
 * FullElectronStateText displays the full state (n,l,m) of the electron, used for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class FullElectronStateText extends RichText {

  public constructor( primaryStateProperty: TReadOnlyProperty<number>,
                      secondaryStateProperty: TReadOnlyProperty<number>,
                      tertiaryStateProperty: TReadOnlyProperty<number> ) {

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty, {
      nSymbol: MOTHASymbols.nStringProperty,
      nValue: primaryStateProperty,
      lSymbol: MOTHASymbols.lStringProperty,
      lValue: secondaryStateProperty,
      mSymbol: MOTHASymbols.mStringProperty,
      mValue: tertiaryStateProperty
    }, { tandem: Tandem.OPT_OUT } );

    super( stringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty,
      isDisposable: false
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'FullElectronStateText', FullElectronStateText );