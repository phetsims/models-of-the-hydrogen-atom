// Copyright 2022-2025, University of Colorado Boulder

/**
 * ElectronStateText displays the electron state (n), used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';

export default class ElectronStateText extends RichText {

  public constructor( nProperty: TReadOnlyProperty<number>, tandem: Tandem ) {

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.nStringProperty,
      value: nProperty
    } );

    super( stringProperty, combineOptions<RichTextOptions>( {
      tandem: tandem
    }, MOTHAConstants.STATE_TEXT_OPTIONS ) );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronStateText', ElectronStateText );