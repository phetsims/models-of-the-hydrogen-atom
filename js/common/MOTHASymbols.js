// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
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

function createDerivedProperty( symbolStringProperty ) {
  return new DerivedProperty( [ symbolStringProperty ],
      symbolString => MathSymbolFont.getRichTextMarkup( symbolString ) );
}

modelsOfTheHydrogenAtom.register( 'MOTHASymbols', MOTHASymbols );
export default MOTHASymbols;