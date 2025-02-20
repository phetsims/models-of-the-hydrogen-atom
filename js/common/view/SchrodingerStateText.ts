// Copyright 2022-2025, University of Colorado Boulder

/**
 * SchrodingerStateText displays the quantum numbers (n,l,m) and orbital that describe the wavefunction of the electron
 * in the Schrödinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHASymbols from '../MOTHASymbols.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';

// In quantum mechanics, an atomic orbital is a function describing the location and wave-like behavior of an electron
// in an atom. These letters represent the orbital shapes, and are indexed by the value of l from (n,l,m).
// l > 2 (f, g, h) are theoretically possible, but will not be encountered in this implementation. See documentation
// for SchrodingerQuantumNumbers.lMax and https://en.wikipedia.org/wiki/Atomic_orbital#Orbitals_table.
const ORBITAL_SHAPE_PROPERTIES = [
  MOTHASymbols.sStringProperty, // s orbitals have a spherical shape.
  MOTHASymbols.pStringProperty, // p orbitals have a dumbbell shape.
  MOTHASymbols.dStringProperty  // d orbitals have a cloverleaf shape.
];
assert && assert( SchrodingerQuantumNumbers.lMax <= 2,
  'Increasing lMax requires adding strings for additional orbitals, e.g. f,g,h.' );

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

    super( stringProperty, combineOptions<RichTextOptions>( {
      tandem: tandem
    }, MOTHAConstants.STATE_TEXT_OPTIONS ) );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerStateText', SchrodingerStateText );