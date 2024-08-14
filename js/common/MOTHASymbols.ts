// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';

const MOTHASymbols = {

  // Symbols with markup for RichText
  nStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.nStringProperty ),
  lStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.lStringProperty ),
  mStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.mStringProperty ),
  xStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.xStringProperty ),
  zStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.zStringProperty ),

  // Arrows
  leftRightArrow: '\u2194', // <->, for photon absorption and emission, e.g. 1 <-> 2
  rightArrow: '\u2192', // for photon absorption, e.g. 1 -> 2
  leftArrow: '\u2190' // for photon emission, e.g. 1 <- 2
};

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;