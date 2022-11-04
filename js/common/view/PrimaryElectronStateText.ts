// Copyright 2022, University of Colorado Boulder

/**
 * PrimaryElectronStateText displays the primary state (n) of the electron, used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

type SelfOptions = EmptySelfOptions;

type PrimaryElectronStateNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class PrimaryElectronStateText extends RichText {

  public constructor( electronStateProperty: TReadOnlyProperty<number>, providedOptions: PrimaryElectronStateNodeOptions ) {

    const options = optionize<PrimaryElectronStateNodeOptions, SelfOptions, RichTextOptions>()( {

      // TextOptions
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty
    }, providedOptions );

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nEqualsStringProperty, {
      nSymbol: MOTHASymbols.nStringProperty,
      nValue: electronStateProperty
    } );

    super( stringProperty, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'PrimaryElectronStateText', PrimaryElectronStateText );