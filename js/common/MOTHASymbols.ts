// Copyright 2022-2025, University of Colorado Boulder

/**
 * MOTHASymbols is the set of strings for various symbols that appear in this sim.
 * Some of these are derived from localized string Properties, and add RichText markup typical of math symbols.
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

  // Schrödinger electron orbital shapes, with markup for RichText
  sStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.sStringProperty ),
  pStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.pStringProperty ),
  dStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.dStringProperty ),

  // Arrows
  leftRightArrow: '\u2194', // <->, for photon absorption and emission, e.g. 1 <-> 2
  rightArrow: '\u2192', // for photon absorption, e.g. 1 -> 2

  // Greek letters
  lambda: '\u03BB'
};

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;