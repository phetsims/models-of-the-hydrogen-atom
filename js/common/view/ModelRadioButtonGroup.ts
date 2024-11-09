// Copyright 2015-2024, University of Colorado Boulder

/**
 * ModelRadioButtonGroup is the radio button group for selecting a predictive model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, HBox, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ModelRadioButtonGroupOptions = SelfOptions & PickRequired<RectangularRadioButtonGroupOptions, 'tandem'>;

export default class ModelRadioButtonGroup extends RectangularRadioButtonGroup<HydrogenAtom> {

  public constructor( predictiveModelProperty: Property<HydrogenAtom>,
                      predictiveModels: HydrogenAtom[],
                      providedOptions: ModelRadioButtonGroupOptions ) {

    const options = optionize<ModelRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      isDisposable: false,
      spacing: 2,
      labelAlign: 'left',
      radioButtonOptions: {
        baseColor: null,
        xMargin: 12,
        yMargin: 8,
        xAlign: 'left',
        buttonAppearanceStrategyOptions: {
          selectedStroke: MOTHAColors.modelsRadioButtonSelectedStrokeProperty,
          deselectedStroke: MOTHAColors.modelsRadioButtonDeselectedStrokeProperty,
          overStroke: MOTHAColors.modelsRadioButtonOverStrokeProperty,
          overFill: null,
          selectedLineWidth: 2.5,
          selectedButtonOpacity: 1,
          deselectedButtonOpacity: 1,
          overButtonOpacity: 1
        },
        contentAppearanceStrategyOptions: {
          selectedContentOpacity: 1,
          deselectedContentOpacity: 1,
          overContentOpacity: 1
        }
      },

      // pdom
      //TODO description: https://github.com/phetsims/sun/issues/900 Use a higher-level API for PDOM structure.
      labelTagName: 'h3',
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.modelRadioButtonGroup.accessibleNameStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.modelRadioButtonGroup.helpTextStringProperty
    }, providedOptions );

    // To make all icons have the same effective size.
    const iconAlignGroup = new AlignGroup();

    const items = predictiveModels.map( predictiveModel => createRadioButtonItem( predictiveModel, iconAlignGroup ) );

    super( predictiveModelProperty, items, options );
  }
}

/**
 * Creates the item for one radio button.
 */
function createRadioButtonItem( predictiveModel: HydrogenAtom, iconAlignGroup: AlignGroup ): RectangularRadioButtonGroupItem<HydrogenAtom> {

  return {
    value: predictiveModel,
    createNode: tandem => new HBox( {
      spacing: 10,
      justify: 'left',
      sizable: false,
      children: [
        iconAlignGroup.createBox( predictiveModel.icon ),
        new Text( predictiveModel.displayNameProperty, {
          fill: MOTHAColors.invertibleTextFillProperty,
          font: new PhetFont( 16 ),
          maxWidth: 200 // determined empirically
        } ) ]
    } ),
    tandemName: `${predictiveModel.tandemNamePrefix}RadioButton`
  };
}

modelsOfTheHydrogenAtom.register( 'ModelRadioButtonGroup', ModelRadioButtonGroup );