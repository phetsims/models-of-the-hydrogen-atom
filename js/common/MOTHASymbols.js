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
  n: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.n ),
  l: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.l ),
  m: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.m ),
  x: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.x ),
  z: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.z )
};

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;