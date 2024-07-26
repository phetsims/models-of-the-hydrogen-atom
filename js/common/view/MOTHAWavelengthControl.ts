// Copyright 2024, University of Colorado Boulder

/**
 * MOTHAWavelengthControl is a specialization of WavelengthNumberControl that lets the user select a UR or visible wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import WavelengthNumberControl, { WavelengthNumberControlOptions } from '../../../../scenery-phet/js/WavelengthNumberControl.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import Slider from '../../../../sun/js/Slider.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import { Color, HBox, Node, VBox } from '../../../../scenery/js/imports.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import MOTHAColors from '../MOTHAColors.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type MOTHAWavelengthControlOptions = SelfOptions & PickRequired<WavelengthNumberControlOptions, 'tandem' | 'visibleProperty'>;

export class MOTHAWavelengthControl extends WavelengthNumberControl {

  public constructor( wavelengthProperty: Property<number>, providedOptions: MOTHAWavelengthControlOptions ) {

    const options = optionize<MOTHAWavelengthControlOptions, SelfOptions, WavelengthNumberControlOptions>()( {
      layoutFunction: layoutFunction,
      spectrumSliderTrackOptions: {
        valueToColor: wavelengthToColor,
        size: new Dimension2( 250, 15 )
      },
      spectrumSliderThumbOptions: {
        valueToColor: wavelengthToColor,
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
      }
    }, providedOptions );

    super( wavelengthProperty, options );

    //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/35 Add 'UV' label on slider.
  }
}

/**
 * Converts a wavelength (in nm) to a Color.
 */
function wavelengthToColor( wavelength: number ): Color {
  return VisibleColor.wavelengthToColor( wavelength, {
    irColor: MOTHAColors.IR_COLOR,
    uvColor: MOTHAColors.UV_COLOR
  } );
}

/**
 * Layout for monochromaticWavelengthControl.
 */
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

modelsOfTheHydrogenAtom.register( 'MOTHAWavelengthControl', MOTHAWavelengthControl );