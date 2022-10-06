// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';

const MOTHASymbols = {
  nStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.nStringProperty ),
  lStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.lStringProperty ),
  mStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.mStringProperty ),
  xStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.xStringProperty ),
  zStringProperty: MathSymbolFont.createDerivedProperty( ModelsOfTheHydrogenAtomStrings.zStringProperty )
};

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;