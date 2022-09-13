// Copyright 2022, University of Colorado Boulder

/**
 * FullElectronStateNode displays the full state (n,l,m) of the electron, used for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

type SelfOptions = EmptySelfOptions;

type FullElectronStateNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class FullElectronStateNode extends RichText {

  public constructor( primaryStateProperty: TReadOnlyProperty<number>,
                      secondaryStateProperty: TReadOnlyProperty<number>,
                      tertiaryStateProperty: TReadOnlyProperty<number>,
                      providedOptions: FullElectronStateNodeOptions ) {

    const options = optionize<FullElectronStateNodeOptions, SelfOptions, RichTextOptions>()( {

      // TextOptions
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty
    }, providedOptions );

    super( '', options );

    Multilink.multilink( [ primaryStateProperty, secondaryStateProperty, tertiaryStateProperty ],
      ( n, l, m ) => {
        this.text = StringUtils.fillIn( ModelsOfTheHydrogenAtomStrings.nlmEqualsStringProperty, {
          nSymbol: MOTHASymbols.n,
          nValue: n,
          lSymbol: MOTHASymbols.l,
          lValue: l,
          mSymbol: MOTHASymbols.m,
          mValue: m
        } );
      } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'FullElectronStateNode', FullElectronStateNode );