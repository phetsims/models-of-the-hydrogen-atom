// Copyright 2016-2023, University of Colorado Boulder

/**
 * MonochromaticControls provides controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, HBox, Node, NodeTranslationOptions, Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { ModelMode } from '../model/ModelMode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { LightMode } from '../model/LightMode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Property from '../../../../axon/js/Property.js';
import WavelengthNumberControl from '../../../../scenery-phet/js/WavelengthNumberControl.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import Slider from '../../../../sun/js/Slider.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

type SelfOptions = EmptySelfOptions;

type MonochromaticControlsOptions = SelfOptions & NodeTranslationOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MonochromaticControls extends VBox {

  public constructor( modelModeProperty: TProperty<ModelMode>,
                      hydrogenAtomModelProperty: TProperty<HydrogenAtom>,
                      wavelengthProperty: Property<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      absorptionWavelengthsVisibleProperty: Property<boolean>,
                      providedOptions: MonochromaticControlsOptions ) {

    const options = optionize<MonochromaticControlsOptions, SelfOptions, VBoxOptions>()( {

      // Visible when light mode is 'monochromatic'
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      align: 'left',
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false,
      isDisposable: false
    }, providedOptions );

    // Wavelength control
    const wavelengthControl = new WavelengthNumberControl( wavelengthProperty, {
      layoutFunction: layoutFunction,
      spectrumSliderTrackOptions: {
        valueToColor: valueToColor,
        size: new Dimension2( 250, 15 )
      },
      spectrumSliderThumbOptions: {
        valueToColor: valueToColor,
        width: 20,
        height: 25,
        stroke: MOTHAColors.wavelengthSliderThumbStrokeProperty
      },
      range: MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE,
      numberDisplayOptions: {
        cornerRadius: 3,
        backgroundFill: MOTHAColors.wavelengthNumberDisplayFillProperty,
        backgroundStroke: MOTHAColors.wavelengthNumberDisplayStrokeProperty,
        textOptions: {
          fill: MOTHAColors.wavelengthTextFillProperty
        }
      },
      tandem: options.tandem.createTandem( 'wavelengthControl' )
    } );

    // 'Absorption Wavelengths' info button
    const absorptionWavelengthsInfoButton = new HBox( {
      spacing: 5,
      children: [
        new InfoButton( {
          iconFill: 'rgb( 41, 106, 163 )',
          scale: 0.4,
          listener: () => {
            //TODO
          }
        } ),
        new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
          font: new PhetFont( 14 ),
          fill: MOTHAColors.absorptionWavelengthTextFillProperty
        } )
      ]
    } );

    options.children = [ wavelengthControl, absorptionWavelengthsInfoButton ];

    super( options );
  }
}

function valueToColor( wavelength: number ): Color {
  return VisibleColor.wavelengthToColor( wavelength, {
    irColor: MOTHAColors.IR_COLOR,
    uvColor: MOTHAColors.UV_COLOR
  } );
}

function layoutFunction( titleNode: Node, numberDisplay: NumberDisplay, slider: Slider, decrementButton: ArrowButton | null, incrementButton: ArrowButton | null ): Node {
  assert && assert( decrementButton, 'There is no decrementButton!' );
  assert && assert( incrementButton, 'There is no incrementButton!' );

  slider.mutateLayoutOptions( {
    grow: 1
  } );

  return new VBox( {
    align: 'center',
    spacing: 5,
    children: [
      new HBox( {
        spacing: 5,
        children: [ decrementButton!, numberDisplay, incrementButton! ]
      } ),
      slider
    ]
  } );
}

modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );