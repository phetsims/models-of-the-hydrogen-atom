// Copyright 2022-2025, University of Colorado Boulder

/**
 * ElectronStateText displays the electron state (n), used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';

type SelfOptions = EmptySelfOptions;

type ElectronStateTextOptions = SelfOptions &
  PickOptional<RichTextOptions, 'font' | 'maxWidth'> &
  PickRequired<RichTextOptions, 'tandem'>;

export default class ElectronStateText extends RichText {

  public constructor( nProperty: TReadOnlyProperty<number>, providedOptions: ElectronStateTextOptions ) {

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.nStringProperty,
      value: nProperty
    } );

    const options = optionize3<ElectronStateTextOptions, SelfOptions, RichTextOptions>()(
      {}, MOTHAConstants.STATE_TEXT_OPTIONS, providedOptions );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronStateText', ElectronStateText );