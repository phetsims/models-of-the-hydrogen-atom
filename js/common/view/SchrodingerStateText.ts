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
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHASymbols from '../MOTHASymbols.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';

// In quantum mechanics, an atomic orbital is a function describing the location and wave-like behavior of an electron
// in an atom. These letters represent the orbital shape, and are indexed by the value of l from (n,l,m).
// l > 2 (f, g, h) are theoretically possible, but should not be encountered in practice.
// See https://en.wikipedia.org/wiki/Atomic_orbital#Orbitals_table
// REVIEW: So we know f, g, h string properties will always be unused? It seems they should go away.
// REVIEW: Even if theoretically possible, there's enough assertions in the sim to prevent this from ever happening.
// REVIEW: https://github.com/phetsims/models-of-the-hydrogen-atom/issues/125
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

    super( stringProperty, combineOptions<RichTextOptions>( {
      tandem: tandem
    }, MOTHAConstants.STATE_TEXT_OPTIONS ) );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerStateText', SchrodingerStateText );