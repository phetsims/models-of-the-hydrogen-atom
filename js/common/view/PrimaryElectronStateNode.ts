// Copyright 2022, University of Colorado Boulder

/**
 * PrimaryElectronStateNode displays the primary state (n) of the electron, used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptyObjectType;

type PrimaryElectronStateNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<TextOptions, 'tandem'>;

export default class PrimaryElectronStateNode extends Text {

  public constructor( electronStateProperty: IReadOnlyProperty<number>, providedOptions: PrimaryElectronStateNodeOptions ) {

    const options = optionize<PrimaryElectronStateNodeOptions, SelfOptions, TextOptions>()( {

      // TextOptions
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty
    }, providedOptions );

    super( '', options );

    electronStateProperty.link( n => {
      this.text = StringUtils.fillIn( modelsOfTheHydrogenAtomStrings.nEquals, {
        n: n
      } );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'PrimaryElectronStateNode', PrimaryElectronStateNode );