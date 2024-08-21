// Copyright 2022-2024, University of Colorado Boulder

//TODO rename to SchrodingerStateText
/**
 * WavefunctionText displays the quantum numbers (n,l,m) that describe the wavefunction of the electron in
 * the Schrodinger model.
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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';

type SelfOptions = EmptySelfOptions;

type WavefunctionTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class WavefunctionText extends RichText {

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      providedOptions: WavefunctionTextOptions ) {

    const options = optionize<WavefunctionTextOptions, SelfOptions, RichTextOptions>()( {

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

    const stringProperty = new DerivedStringProperty( [
        ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty,
        MOTHASymbols.nStringProperty,
        MOTHASymbols.lStringProperty,
        MOTHASymbols.mStringProperty,
        nlmProperty
      ],
      ( pattern, nString, lString, mString, nlm ) => StringUtils.fillIn( pattern, {
        nSymbol: nString,
        lSymbol: lString,
        mSymbol: mString,
        nValue: nlm.n,
        lValue: nlm.l,
        mValue: nlm.m
      } ) );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'WavefunctionText', WavefunctionText );