// Copyright 2024, University of Colorado Boulder

//TODO Should we display the color for each wavelength?
//TODO Should we display UV/Visible/IR labels?
//TODO Should the UV and Visible wavelengths be selectable, and set the value of wavelengthProperty?
//TODO Using a left-right arrow implies absorption (right) AND emission (left). Should this dialog be retitled? Or use a right arrow only?
//TODO Should we title this Absorption and Emission Spectra? See https://webbtelescope.org/contents/articles/spectroscopy-101--how-absorption-and-emission-spectra-work
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
import { AlignGroup, GridBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BohrModel from '../model/BohrModel.js';

const HEADING_TEXT_OPTIONS = {
  font: new PhetFont( {
    size: 14,
    weight: 'bold'
  } )
};

const TEXT_OPTIONS = {
  font: new PhetFont( 14 )
};

type SelfOptions = EmptySelfOptions;

type AbsorptionWavelengthsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

export default class AbsorptionWavelengthsDialog extends Dialog {

  public constructor( monochromaticWavelengthProperty: NumberProperty, providedOptions: AbsorptionWavelengthsDialogOptions ) {

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
      new Text( ModelsOfTheHydrogenAtomStrings.wavelengthNanometersStringProperty, HEADING_TEXT_OPTIONS ),
      new Text( ModelsOfTheHydrogenAtomStrings.nTransitionStringProperty, HEADING_TEXT_OPTIONS )
    ];

    const rows: Node[][] = [
      columnHeadings
    ];

    // So that all wavelengthText have the same effective size.
    const wavelengthTextAlignGroup = new AlignGroup();
    const wavelengthNodeAlignGroup = new AlignGroup();

    for ( const [ wavelength, transition ] of BohrModel.wavelengthToStateTransitionMap ) {

      const wavelengthText = wavelengthTextAlignGroup.createBox( new Text( wavelength, TEXT_OPTIONS ) );
      let waveLengthNode: Node;
      if ( monochromaticWavelengthProperty.range.contains( wavelength ) ) {
        waveLengthNode = new RectangularPushButton( {
          content: wavelengthText,
          listener: () => {
            monochromaticWavelengthProperty.value = wavelength;
          }
        } );
      }
      else {
        waveLengthNode = wavelengthText;
      }

      rows.push( [
        wavelengthNodeAlignGroup.createBox( waveLengthNode ),
        new Text( `${transition.n1} ${MOTHASymbols.leftRightArrow} ${transition.n2}`, TEXT_OPTIONS )
      ] );
    }

    const gridBox = new GridBox( {
      rows: rows,
      xSpacing: 15,
      ySpacing: 4
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