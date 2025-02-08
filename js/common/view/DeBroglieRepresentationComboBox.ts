// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglieRepresentationComboBox is the combo box for selecting which representation of the de Broglie model show be displayed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox, { ComboBoxItem, ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';

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
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.deBroglieRepresentationComboBox.accessibleNameStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.deBroglieRepresentationComboBox.helpTextStringProperty
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
        tandemName: 'radialDistanceItem'
      },
      {
        value: '3DHeight',
        createNode: () => threeDHeightText,
        tandemName: '3DHeightItem'
      },
      {
        value: 'brightness',
        createNode: () => brightnessText,
        tandemName: 'brightnessItem'
      }
    ];

    super( deBroglieRepresentationProperty, items, listboxParent, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRepresentationComboBox', DeBroglieRepresentationComboBox );