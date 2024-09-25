// Copyright 2022-2024, University of Colorado Boulder

/**
 * Strings for mathematical symbols.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';

const MOTHASymbols = {

  // Axis labels, with markup for RichText
  xStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.xStringProperty ),
  zStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.zStringProperty ),

  // Quantum numbers (n,l,m), with markup for RichText
  nStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.nStringProperty ),
  lStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.lStringProperty ),
  mStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.mStringProperty ),

  // Schrodinger electron orbitals, with markup for RichText
  sStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.sStringProperty ),
  pStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.pStringProperty ),
  dStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.dStringProperty ),
  gStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.gStringProperty ),
  fStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.fStringProperty ),
  hStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.hStringProperty ),

  // Arrows
  leftRightArrow: '\u2194', // <->, for photon absorption and emission, e.g. 1 <-> 2
  rightArrow: '\u2192', // for photon absorption, e.g. 1 -> 2
  leftArrow: '\u2190', // for photon emission, e.g. 1 <- 2

  // Greek letters
  lambda: '\u03BB'
};

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;