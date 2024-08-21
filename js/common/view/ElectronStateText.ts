// Copyright 2022-2024, University of Colorado Boulder

/**
 * ElectronStateText displays the electron state (n), used for the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type PrimaryElectronStateTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class ElectronStateText extends RichText {

  public constructor( nProperty: TReadOnlyProperty<number>, providedOptions: PrimaryElectronStateTextOptions ) {

    const options = optionize<PrimaryElectronStateTextOptions, SelfOptions, RichTextOptions>()( {

      // RichTextOptions
      isDisposable: false,
      font: new PhetFont( 16 ),
      fill: MOTHAColors.stateDisplayFillProperty,
      maxWidth: 200,
      phetioVisiblePropertyInstrumented: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nEqualsStringProperty, {
      nSymbol: MOTHASymbols.nStringProperty,
      nValue: nProperty
    }, { tandem: Tandem.OPT_OUT } );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronStateText', ElectronStateText );