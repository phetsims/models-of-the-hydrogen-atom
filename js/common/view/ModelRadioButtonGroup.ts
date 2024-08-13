// Copyright 2015-2024, University of Colorado Boulder

//TODO colors of Billiard Ball icon do not match BilliardBallNode
/**
 * ModelRadioButtonGroup is the radio button group for selecting a predictive model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../MOTHAColors.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

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
      }
    }, providedOptions );

    const items: RectangularRadioButtonGroupItem<HydrogenAtom>[] = [];
    for ( let i = 0; i < predictiveModels.length; i++ ) {
      items.push( createRadioButtonItem( predictiveModels[ i ] ) );
    }

    super( predictiveModelProperty, items, options );
  }
}

/**
 * Creates the item for one radio button.
 */
function createRadioButtonItem( predictiveModel: HydrogenAtom ): RectangularRadioButtonGroupItem<HydrogenAtom> {

  return {
    value: predictiveModel,
    createNode: tandem => new HBox( {
      spacing: 10,
      justify: 'left',
      sizable: false,
      children: [
        predictiveModel.icon,
        new Text( predictiveModel.displayNameProperty, {
          fill: MOTHAColors.invertibleTextFillProperty,
          font: new PhetFont( 16 ),
          maxWidth: 200 // determined empirically
        } ) ]
    } ),
    tandemName: `${predictiveModel.tandem.name}RadioButton` //TODO too clever?
  };
}

modelsOfTheHydrogenAtom.register( 'ModelRadioButtonGroup', ModelRadioButtonGroup );