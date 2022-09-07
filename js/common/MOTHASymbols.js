// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';

const GQSymbols = {
  n: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.n ),
  l: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.l ),
  m: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.m ),
  x: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.x ),
  z: MathSymbolFont.getRichTextMarkup( ModelsOfTheHydrogenAtomStrings.z )
};

modelsOfTheHydrogenAtom.register( 'GQSymbols', GQSymbols );
export default GQSymbols;