// Copyright 2024, University of Colorado Boulder

//TODO Should we display the color for each wavelength?
//TODO Should we display UV/Visible/IR labels?
//TODO Should the UV and Visible wavelengths be selectable, and set the value of wavelengthProperty?
//TODO Using a left-right arrow implies absorption (right) AND emission (left). Should this dialog be retitled? Or use a right arrow only?
//TODO Should the display be ordered by increasing wavelength, with wavelength as the left column?
//TODO Being a modal dialog, this is not very useful with Electron Energy Level accordion box.

/**
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dialog, { DialogOptions } from '../../../../sun/js/Dialog.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { GridBox, Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

const HEADING_TEXT_OPTIONS = {
  font: new PhetFont( {
    size: 14,
    weight: 'bold'
  } )
};

const TEXT_OPTIONS = {
  font: new PhetFont( 14 )
};

type StateTransition = {
  n1: number;
  n2: number;
};

// Absorption wavelengths and their associated state transition.
const map = new Map<number, StateTransition>();
map.set( 122, { n1: 1, n2: 2 } );
map.set( 103, { n1: 1, n2: 3 } );
map.set( 97, { n1: 1, n2: 4 } );
map.set( 95, { n1: 1, n2: 5 } );
map.set( 94, { n1: 1, n2: 6 } );
map.set( 656, { n1: 2, n2: 3 } );
map.set( 486, { n1: 2, n2: 4 } );
map.set( 434, { n1: 2, n2: 5 } );
map.set( 410, { n1: 2, n2: 6 } );
map.set( 1876, { n1: 3, n2: 4 } );
map.set( 1282, { n1: 3, n2: 5 } );
map.set( 1094, { n1: 3, n2: 6 } );
map.set( 4052, { n1: 4, n2: 5 } );
map.set( 2626, { n1: 4, n2: 6 } );
map.set( 7460, { n1: 5, n2: 6 } );

type SelfOptions = EmptySelfOptions;

type AbsorptionWavelengthsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

export default class AbsorptionWavelengthsDialog extends Dialog {

  public constructor( providedOptions: AbsorptionWavelengthsDialogOptions ) {

    const options = optionize<AbsorptionWavelengthsDialogOptions, SelfOptions, DialogOptions>()( {

      // DialogOptions
      isDisposable: false
    }, providedOptions );

    const titleText = new Text( 'Absorption Wavelengths', {
      font: new PhetFont( {
        size: 16,
        weight: 'bold'
      } )
    } );

    const columnHeadings = [
      new Text( ModelsOfTheHydrogenAtomStrings.nTransitionStringProperty, HEADING_TEXT_OPTIONS ),
      new Text( ModelsOfTheHydrogenAtomStrings.wavelengthNanometersStringProperty, HEADING_TEXT_OPTIONS )
    ];

    const rows = [
      columnHeadings
    ];

    for ( const [ wavelength, transition ] of map ) {
      rows.push( [
        new Text( `${transition.n1} \u2194 ${transition.n2}`, TEXT_OPTIONS ),
        new Text( wavelength, TEXT_OPTIONS )
      ] );
    }

    const gridBox = new GridBox( {
      rows: rows,
      xSpacing: 15,
      ySpacing: 8
    } );

    const content = new VBox( {
      spacing: 10,
      children: [
        titleText,
        gridBox
      ]
    } );

    super( content, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionWavelengthsDialog', AbsorptionWavelengthsDialog );