// Copyright 2024, University of Colorado Boulder

//TODO Delete UnderConstructionText when feature complete.
/**
 * UnderConstructionText displays 'Under Construction' to identify features that have not been completed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

const FONT = new PhetFont( 16 );

type SelfOptions = EmptySelfOptions;

type UnderConstructionTextOptions = SelfOptions & NodeTranslationOptions;

export default class UnderConstructionText extends Text {

  public constructor( providedOptions?: UnderConstructionTextOptions ) {

    const options = optionize<UnderConstructionTextOptions, SelfOptions, TextOptions>()( {

      // TextOptions
      font: FONT,
      fill: 'red'
    }, providedOptions );

    super( 'Under Construction', options );
  }
}

modelsOfTheHydrogenAtom.register( 'UnderConstructionText', UnderConstructionText );