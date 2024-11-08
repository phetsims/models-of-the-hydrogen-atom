// Copyright 2022-2024, University of Colorado Boulder

/**
 * SchrodingerStateText displays the quantum numbers (n,l,m) and subshell that describe the wavefunction of the electron
 * in the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

type SelfOptions = EmptySelfOptions;

type WavefunctionTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

// Orbital names, indexed by the value of l from (n,l,m).
const ORBITALS = [
  MOTHASymbols.sStringProperty,
  MOTHASymbols.pStringProperty,
  MOTHASymbols.dStringProperty,
  MOTHASymbols.gStringProperty,
  MOTHASymbols.fStringProperty,
  MOTHASymbols.hStringProperty
];

export default class SchrodingerStateText extends RichText {

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

    const stringProperty = DerivedStringProperty.deriveAny( [
        ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty,
        MOTHASymbols.nStringProperty,
        MOTHASymbols.lStringProperty,
        MOTHASymbols.mStringProperty,
        nlmProperty,
        ...ORBITALS
      ],
      () => StringUtils.fillIn( ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty.value, {
        nSymbol: MOTHASymbols.nStringProperty.value,
        lSymbol: MOTHASymbols.lStringProperty.value,
        mSymbol: MOTHASymbols.mStringProperty.value,
        nValue: nlmProperty.value.n,
        lValue: nlmProperty.value.l,
        mValue: nlmProperty.value.m,
        subshell: ORBITALS[ nlmProperty.value.l ].value
      } ) );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerStateText', SchrodingerStateText );