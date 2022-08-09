// Copyright 2022, University of Colorado Boulder

/**
 * PrimaryElectronStateNode displays the primary state (n) of the electron, used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

type SelfOptions = EmptySelfOptions;

type PrimaryElectronStateNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class PrimaryElectronStateNode extends RichText {

  public constructor( electronStateProperty: TReadOnlyProperty<number>, providedOptions: PrimaryElectronStateNodeOptions ) {

    const options = optionize<PrimaryElectronStateNodeOptions, SelfOptions, RichTextOptions>()( {

      // TextOptions
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty
    }, providedOptions );

    super( '', options );

    electronStateProperty.link( n => {
      this.text = StringUtils.fillIn( modelsOfTheHydrogenAtomStrings.nEquals, {
        nSymbol: MOTHASymbols.n,
        nValue: n
      } );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'PrimaryElectronStateNode', PrimaryElectronStateNode );