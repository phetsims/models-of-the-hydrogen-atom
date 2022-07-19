// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';

const GQSymbols = {
  n: MathSymbolFont.getRichTextMarkup( modelsOfTheHydrogenAtomStrings.n ),
  l: MathSymbolFont.getRichTextMarkup( modelsOfTheHydrogenAtomStrings.l ),
  m: MathSymbolFont.getRichTextMarkup( modelsOfTheHydrogenAtomStrings.m ),
  x: MathSymbolFont.getRichTextMarkup( modelsOfTheHydrogenAtomStrings.x ),
  z: MathSymbolFont.getRichTextMarkup( modelsOfTheHydrogenAtomStrings.z )
};

modelsOfTheHydrogenAtom.register( 'GQSymbols', GQSymbols );
export default GQSymbols;