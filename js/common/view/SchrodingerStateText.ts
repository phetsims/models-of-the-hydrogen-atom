// Copyright 2022-2025, University of Colorado Boulder

/**
 * SchrodingerStateText displays the quantum numbers (n,l,m) and orbital that describe the wavefunction of the electron
 * in the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// In quantum mechanics, an atomic orbital is a function describing the location and wave-like behavior of an electron
// in an atom. These letters represent the orbital shape, and are indexed by the value of l from (n,l,m).
// l > 2 (f, g, h) are theoretically possible, but should not be encountered in practice.
// See https://en.wikipedia.org/wiki/Atomic_orbital#Orbitals_table
const ORBITAL_SHAPE_PROPERTIES = [
  MOTHASymbols.sStringProperty,
  MOTHASymbols.pStringProperty,
  MOTHASymbols.dStringProperty,
  MOTHASymbols.fStringProperty,
  MOTHASymbols.gStringProperty,
  MOTHASymbols.hStringProperty
];

export default class SchrodingerStateText extends RichText {

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>, tandem: Tandem ) {

    const stringProperty = DerivedStringProperty.deriveAny( [
        ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty,
        MOTHASymbols.nStringProperty,
        MOTHASymbols.lStringProperty,
        MOTHASymbols.mStringProperty,
        nlmProperty,
        ...ORBITAL_SHAPE_PROPERTIES
      ],
      () => StringUtils.fillIn( ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty.value, {
        nSymbol: MOTHASymbols.nStringProperty.value,
        lSymbol: MOTHASymbols.lStringProperty.value,
        mSymbol: MOTHASymbols.mStringProperty.value,
        nValue: nlmProperty.value.n,
        lValue: nlmProperty.value.l,
        mValue: nlmProperty.value.m,
        orbitalShape: ORBITAL_SHAPE_PROPERTIES[ nlmProperty.value.l ].value
      } ) );

    super( stringProperty, {
      isDisposable: false,
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty,
      maxWidth: 200,
      tandem: tandem,
      phetioVisiblePropertyInstrumented: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerStateText', SchrodingerStateText );