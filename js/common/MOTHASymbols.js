// Copyright 2018-2021, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';

// constants
const SYMBOL_PATTERN = `<i style='font-family: ${new MathSymbolFont( 10 ).family}'>{{symbol}}</i>`;

const GQSymbols = {
  n: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: modelsOfTheHydrogenAtomStrings.n } ),
  l: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: modelsOfTheHydrogenAtomStrings.l } ),
  m: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: modelsOfTheHydrogenAtomStrings.m } ),
  x: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: modelsOfTheHydrogenAtomStrings.x } ),
  z: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: modelsOfTheHydrogenAtomStrings.z } )
};

modelsOfTheHydrogenAtom.register( 'GQSymbols', GQSymbols );
export default GQSymbols;