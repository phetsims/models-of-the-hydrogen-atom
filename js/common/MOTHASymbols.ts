// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';

const MOTHASymbols = {
  nStringProperty: createDerivedProperty( ModelsOfTheHydrogenAtomStrings.nStringProperty ),
  lStringProperty: createDerivedProperty( ModelsOfTheHydrogenAtomStrings.lStringProperty ),
  mStringProperty: createDerivedProperty( ModelsOfTheHydrogenAtomStrings.mStringProperty ),
  xStringProperty: createDerivedProperty( ModelsOfTheHydrogenAtomStrings.xStringProperty ),
  zStringProperty: createDerivedProperty( ModelsOfTheHydrogenAtomStrings.zStringProperty )
};

/**
 * Wraps a symbol in RichText markup so that it will be rendered in MathSymbolFont.
 */
function createDerivedProperty( symbolStringProperty: TReadOnlyProperty<string> ): TReadOnlyProperty<string> {
  return new DerivedProperty( [ symbolStringProperty ],
      symbolString => MathSymbolFont.getRichTextMarkup( symbolString ) );
}

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;