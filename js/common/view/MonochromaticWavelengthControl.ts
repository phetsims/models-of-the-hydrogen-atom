// Copyright 2024-2025, University of Colorado Boulder

/**
 * MonochromaticWavelengthControl is a specialization of WavelengthNumberControl that lets the user select
 * an ultraviolet (UV) or visible wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import WavelengthNumberControl from '../../../../scenery-phet/js/WavelengthNumberControl.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import Slider from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { LightMode } from '../model/LightMode.js';
import LightSource from '../model/LightSource.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

const SLIDER_TRACK_SIZE = new Dimension2( 200, 15 );

export class MonochromaticWavelengthControl extends WavelengthNumberControl {

  public constructor( wavelengthProperty: NumberProperty,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      tandem: Tandem ) {

    // 'UV' text shown in the UV section of the slider track.
    const uvText = new Text( ModelsOfTheHydrogenAtomStrings.uvStringProperty, {
      font: new PhetFont( 12 ),
      maxWidth: 30,
      fill: 'black'
    } );

    // Layout for this NumberControl, with 'UV' centered in the UV section of the slider track.
    const layoutFunction = ( titleNode: Node, numberDisplay: NumberDisplay, slider: Slider, decrementButton: ArrowButton | null, incrementButton: ArrowButton | null ): Node => {
      assert && assert( decrementButton, 'A decrementButton is required.' );
      assert && assert( incrementButton, 'An incrementButton is required.' );

      const sliderWrapper = new Node( {
        children: [ slider, uvText ]
      } );

      // Center 'UV' in the UV section of the slider track.
      uvText.maxHeight = 0.75 * SLIDER_TRACK_SIZE.height;
      const uvTrackWidth = SLIDER_TRACK_SIZE.width * ( VisibleColor.MIN_WAVELENGTH - MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.min ) / MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.getLength();
      const uvTextCenterX = slider.x + uvTrackWidth / 2 + 1; // + 1 to account for slider track lineWidth
      const uvTextCenterY = slider.top + SLIDER_TRACK_SIZE.height / 2 + 1; // + 1 to account for slider track lineWidth
      uvText.localBoundsProperty.link( () => {
        uvText.centerX = uvTextCenterX;
        uvText.centerY = uvTextCenterY;
      } );

      return new VBox( {
        align: 'center',
        spacing: 5,
        children: [
          new HBox( {
            spacing: 5,
            children: [ decrementButton!, numberDisplay, incrementButton! ]
          } ),
          sliderWrapper
        ]
      } );
    };

    const constrainValue = ( wavelength: number ) => Utils.toFixedNumber( wavelength, 0 );

    super( wavelengthProperty, {
      isDisposable: false,
      range: wavelengthProperty.range,
      layoutFunction: layoutFunction,
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.wavelengthNumberControl.accessibleNameStringProperty,
      accessibleHelpText: ModelsOfTheHydrogenAtomStrings.a11y.wavelengthNumberControl.accessibleHelpTextStringProperty,
      titleNodeOptions: {
        tandem: Tandem.OPT_OUT // because layoutFunction omits the title
      },
      sliderOptions: {
        constrainValue: constrainValue
      },
      spectrumSliderTrackOptions: {
        constrainValue: constrainValue,
        valueToColor: LightSource.wavelengthToColor,
        size: SLIDER_TRACK_SIZE
      },
      spectrumSliderThumbOptions: {
        valueToColor: LightSource.wavelengthToColor,
        width: 20,
        height: 25,
        stroke: MOTHAColors.wavelengthSliderThumbStrokeProperty,
        cursorHeight: SLIDER_TRACK_SIZE.height,
        windowCursorOptions: {
          stroke: MOTHAColors.wavelengthSliderThumbStrokeProperty,
          cornerRadius: 0
        }
      },
      numberDisplayOptions: {
        cornerRadius: 3,
        backgroundFill: MOTHAColors.wavelengthNumberDisplayFillProperty,
        backgroundStroke: MOTHAColors.wavelengthNumberDisplayStrokeProperty,
        textOptions: {
          fill: MOTHAColors.wavelengthTextFillProperty
        }
      },
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'MonochromaticWavelengthControl', MonochromaticWavelengthControl );