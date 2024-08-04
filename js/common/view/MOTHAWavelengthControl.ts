// Copyright 2024, University of Colorado Boulder

//TODO Should we indicate when wavelengthProperty is an absorption wavelength?
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
import { HBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import MOTHAColors from '../MOTHAColors.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Light from '../model/Light.js';
import { LightMode } from '../model/LightMode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

const SLIDER_TRACK_SIZE = new Dimension2( 250, 15 );

type SelfOptions = EmptySelfOptions;

type MOTHAWavelengthControlOptions = SelfOptions & PickRequired<WavelengthNumberControlOptions, 'tandem'>;

export class MOTHAWavelengthControl extends WavelengthNumberControl {

  public constructor( wavelengthProperty: Property<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      providedOptions: MOTHAWavelengthControlOptions ) {

    // 'UV' text shown in the UV section of the slider track.
    const uvText = new Text( ModelsOfTheHydrogenAtomStrings.uvStringProperty, {
      font: new PhetFont( 12 ),
      maxWidth: 30,
      fill: 'black'
    } );

    // Layout for this NumberControl, with 'UV' centered in the UV section of the slider track.
    const layoutFunction = ( titleNode: Node, numberDisplay: NumberDisplay, slider: Slider, decrementButton: ArrowButton | null, incrementButton: ArrowButton | null ): Node => {
      assert && assert( decrementButton, 'There is no decrementButton!' );
      assert && assert( incrementButton, 'There is no incrementButton!' );

      const sliderWrapper = new Node( {
        children: [ slider, uvText ]
      } );

      // Center 'UV' in the UV section of the slider track.
      uvText.maxHeight = 0.75 * SLIDER_TRACK_SIZE.height;
      const uvTrackWidth = SLIDER_TRACK_SIZE.width * ( VisibleColor.MIN_WAVELENGTH - MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.min ) / MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.getLength();
      const uvTextCenterX = slider.x + uvTrackWidth / 2;
      const uvTextCenterY = slider.top + SLIDER_TRACK_SIZE.height / 2;
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

    const options = optionize<MOTHAWavelengthControlOptions, SelfOptions, WavelengthNumberControlOptions>()( {
      layoutFunction: layoutFunction,
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      spectrumSliderTrackOptions: {
        valueToColor: Light.wavelengthToColor,
        size: SLIDER_TRACK_SIZE
      },
      spectrumSliderThumbOptions: {
        valueToColor: Light.wavelengthToColor,
        cursorHeight: SLIDER_TRACK_SIZE.height,
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
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAWavelengthControl', MOTHAWavelengthControl );