// Copyright 2022-2023, University of Colorado Boulder

/**
 * PrimaryElectronStateText displays the primary state (n) of the electron, used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class PrimaryElectronStateText extends RichText {

  public constructor( electronStateProperty: TReadOnlyProperty<number> ) {

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nEqualsStringProperty, {
      nSymbol: MOTHASymbols.nStringProperty,
      nValue: electronStateProperty
    }, { tandem: Tandem.OPT_OUT } );

    super( stringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty,
      isDisposable: false
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PrimaryElectronStateText', PrimaryElectronStateText );