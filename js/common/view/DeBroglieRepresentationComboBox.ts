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
      yMargin: 6,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.deBroglieRepresentationStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.deBroglieRepresentationHelpTextStringProperty
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( 14 ),
      maxWidth: 150
    };

    const radialDistanceText = new Text( ModelsOfTheHydrogenAtomStrings.radialDistanceStringProperty, textOptions );

    const threeDHeightText = new Text( ModelsOfTheHydrogenAtomStrings[ '3DHeightStringProperty' ], textOptions );

    const brightnessText = new Text( ModelsOfTheHydrogenAtomStrings.brightnessStringProperty, textOptions );

    const items: ComboBoxItem<DeBroglieRepresentation>[] = [
      {
        value: 'radialDistance',
        createNode: () => radialDistanceText,

        //TODO description: https://github.com/phetsims/sun/issues/906 Why is the API not ComboBoxItem.accessibleName?
        a11yName: ModelsOfTheHydrogenAtomStrings.a11y.radialDistanceStringProperty,
        tandemName: 'radialDistanceItem'
      },
      {
        value: '3DHeight',
        createNode: () => threeDHeightText,
        a11yName: ModelsOfTheHydrogenAtomStrings.a11y[ '3DHeightStringProperty' ],
        tandemName: '3DHeightItem'
      },
      {
        value: 'brightness',
        createNode: () => brightnessText,
        a11yName: ModelsOfTheHydrogenAtomStrings.a11y.brightnessStringProperty,
        tandemName: 'brightnessItem'
      }
    ];

    super( deBroglieRepresentationProperty, items, listboxParent, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRepresentationComboBox', DeBroglieRepresentationComboBox );