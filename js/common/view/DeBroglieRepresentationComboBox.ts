// Copyright 2022-2024, University of Colorado Boulder

/**
 * DeBroglieRepresentationComboBox is the combo box for selecting which representation of the de Broglie model show be displayed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ComboBox, { ComboBoxItem, ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';
import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieViewComboBoxOptions = SelfOptions & NodeTranslationOptions & PickRequired<ComboBoxOptions, 'tandem'>;

export default class DeBroglieRepresentationComboBox extends ComboBox<DeBroglieRepresentation> {

  public constructor( deBroglieRepresentationProperty: Property<DeBroglieRepresentation>,
                      listboxParent: Node,
                      providedOptions: DeBroglieViewComboBoxOptions ) {

    const options = optionize<DeBroglieViewComboBoxOptions, SelfOptions, ComboBoxOptions>()( {

      // ComboBoxOptions
      isDisposable: false,
      xMargin: 10,
      yMargin: 6
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( 14 ),
      maxWidth: 150
    };

    const radialText = new Text( ModelsOfTheHydrogenAtomStrings.radialStringProperty, textOptions );

    // threeDText does not match '3DViewText' tandem name because JavaScript identifiers cannot begin with a number.
    const threeDText = new Text( ModelsOfTheHydrogenAtomStrings[ '3DStringProperty' ], textOptions );

    const brightnessText = new Text( ModelsOfTheHydrogenAtomStrings.brightnessStringProperty, textOptions );

    const items: ComboBoxItem<DeBroglieRepresentation>[] = [
      { value: 'radial', createNode: () => radialText, tandemName: 'radialItem' },
      { value: '3D', createNode: () => threeDText, tandemName: '3DItem' },
      { value: 'brightness', createNode: () => brightnessText, tandemName: 'brightnessItem' }
    ];

    super( deBroglieRepresentationProperty, items, listboxParent, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRepresentationComboBox', DeBroglieRepresentationComboBox );