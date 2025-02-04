// Copyright 2015-2025, University of Colorado Boulder

/**
 * AtomicModelRadioButtonGroup is the radio button group for selecting one of the predictive atomic models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, HBox, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {
  radioButtonTextMaxWidth: number;
};

type AtomicModelRadioButtonGroupOptions = SelfOptions & PickRequired<RectangularRadioButtonGroupOptions, 'tandem'>;

export default class AtomicModelRadioButtonGroup extends RectangularRadioButtonGroup<HydrogenAtom> {

  public constructor( atomicModelProperty: Property<HydrogenAtom>,
                      atomicModels: HydrogenAtom[],
                      providedOptions: AtomicModelRadioButtonGroupOptions ) {

    const options = optionize<AtomicModelRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      isDisposable: false,
      spacing: 2,
      labelAlign: 'left',
      radioButtonOptions: {
        baseColor: MOTHAColors.modelsRadioButtonFillProperty,
        xMargin: 12,
        yMargin: 8,
        xAlign: 'left',
        buttonAppearanceStrategyOptions: {
          overFill: MOTHAColors.modelsRadioButtonFillProperty,
          selectedStroke: MOTHAColors.modelsRadioButtonSelectedStrokeProperty,
          deselectedStroke: MOTHAColors.modelsRadioButtonDeselectedStrokeProperty,
          overStroke: MOTHAColors.modelsRadioButtonOverStrokeProperty,
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
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.modelRadioButtonGroup.accessibleNameStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.modelRadioButtonGroup.helpTextStringProperty,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    // To make all icons have the same effective size.
    const iconAlignGroup = new AlignGroup();

    const items = atomicModels.map( atomicModel =>
      createRadioButtonItem( atomicModel, iconAlignGroup, providedOptions.radioButtonTextMaxWidth ) );

    super( atomicModelProperty, items, options );
  }
}

/**
 * Creates the item for one radio button.
 */
function createRadioButtonItem( atomicModel: HydrogenAtom, iconAlignGroup: AlignGroup, textMaxWidth: number ): RectangularRadioButtonGroupItem<HydrogenAtom> {

  return {
    value: atomicModel,
    createNode: tandem => new HBox( {
      spacing: 10,
      justify: 'left',
      sizable: false,
      children: [
        iconAlignGroup.createBox( atomicModel.icon ),
        new Text( atomicModel.displayNameProperty, {
          fill: MOTHAColors.invertibleTextFillProperty,
          font: new PhetFont( 16 ),
          maxWidth: textMaxWidth
        } ) ]
    } ),
    tandemName: `${atomicModel.tandemNamePrefix}RadioButton`
  };
}

modelsOfTheHydrogenAtom.register( 'AtomicModelRadioButtonGroup', AtomicModelRadioButtonGroup );