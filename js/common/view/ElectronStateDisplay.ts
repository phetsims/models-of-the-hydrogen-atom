// Copyright 2015-2022, University of Colorado Boulder

/**
 * ElectronStateDisplay displays the state of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberDisplay, { NumberDisplayOptions } from '../../../../scenery-phet/js/NumberDisplay.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptyObjectType;

type ElectronStateDisplayOptions = SelfOptions & NodeTranslationOptions & PickRequired<NumberDisplayOptions, 'tandem'>;

export default class ElectronStateDisplay extends NumberDisplay {

  public constructor( electronStateProperty: NumberProperty, providedOptions: ElectronStateDisplayOptions ) {

    const options = optionize<ElectronStateDisplayOptions, SelfOptions, NumberDisplayOptions>()( {

      // NumberDisplayOptions
      backgroundFill: null,
      backgroundStroke: null,
      valuePattern: modelsOfTheHydrogenAtomStrings.nEqualsValue,
      textOptions: {
        font: new PhetFont( 16 ),
        fill: MOTHAColors.stateDisplayFillProperty
      }
    }, providedOptions );

    assert && assert( electronStateProperty.range );
    super( electronStateProperty, electronStateProperty.range!, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronStateDisplay', ElectronStateDisplay );