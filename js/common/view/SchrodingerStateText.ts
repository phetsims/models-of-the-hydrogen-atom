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

// Letters that represent the orbital shape, indexed by the value of l from (n,l,m).
// s = spherical
// p = dumbbell
// d = clover leaf
// ...
//TODO Are these correct? I don't find g or h in Google search, and the order of f is suspect.
const ORBITAL_SHAPE_PROPERTIES = [
  MOTHASymbols.sStringProperty,
  MOTHASymbols.pStringProperty,
  MOTHASymbols.dStringProperty,
  MOTHASymbols.gStringProperty,
  MOTHASymbols.fStringProperty,
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