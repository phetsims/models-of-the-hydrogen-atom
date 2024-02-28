// Copyright 2022-2023, University of Colorado Boulder

/**
 * DeBroglieViewComboBox is the combo box for selecting which view of the de Broglie model show be displayed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ComboBox, { ComboBoxItem, ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { DeBroglieView } from '../model/DeBroglieView.js';
import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieViewComboBoxOptions = SelfOptions & NodeTranslationOptions & PickRequired<ComboBoxOptions, 'tandem'>;

export default class DeBroglieViewComboBox extends ComboBox<DeBroglieView> {

  public constructor( deBroglieViewProperty: Property<DeBroglieView>,
                      listboxParent: Node,
                      providedOptions: DeBroglieViewComboBoxOptions ) {

    const options = optionize<DeBroglieViewComboBoxOptions, SelfOptions, ComboBoxOptions>()( {

      // ComboBoxOptions
      xMargin: 10,
      yMargin: 6,
      isDisposable: false
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( 14 ),
      maxWidth: 150
    };

    const radialViewText = new Text( ModelsOfTheHydrogenAtomStrings.radialViewStringProperty, textOptions );

    // threeDViewText does not match '3DViewText' tandem name because JavaScript identifiers cannot begin with a number.
    const threeDViewText = new Text( ModelsOfTheHydrogenAtomStrings[ '3DViewStringProperty' ], textOptions );

    const brightnessViewText = new Text( ModelsOfTheHydrogenAtomStrings.brightnessViewStringProperty, textOptions );

    const items: ComboBoxItem<DeBroglieView>[] = [
      { value: 'radial', createNode: () => radialViewText, tandemName: 'radialItem' },
      { value: '3D', createNode: () => threeDViewText, tandemName: '3DItem' },
      { value: 'brightness', createNode: () => brightnessViewText, tandemName: 'brightnessItem' }
    ];

    super( deBroglieViewProperty, items, listboxParent, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieViewComboBox', DeBroglieViewComboBox );