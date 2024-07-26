// Copyright 2024, University of Colorado Boulder

/**
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Color, HBox, Node, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import Property from '../../../../axon/js/Property.js';
import { LightMode } from '../model/LightMode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import WavelengthNumberControl from '../../../../scenery-phet/js/WavelengthNumberControl.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import Slider from '../../../../sun/js/Slider.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = EmptySelfOptions;

type LightControlPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export class LightControlPanel extends Panel {

  public constructor( lightModeProperty: Property<LightMode>,
                      monochromaticWavelengthProperty: Property<number>,
                      providedOptions: LightControlPanelOptions ) {

    const options = optionize<LightControlPanelOptions, SelfOptions, PanelOptions>()( {

      //TODO PanelOptions
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty
    }, providedOptions );

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( lightModeProperty, {
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    // Wavelength control
    const wavelengthControl = new WavelengthNumberControl( monochromaticWavelengthProperty, {
      layoutFunction: layoutFunction,
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
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
      visibleProperty: wavelengthControl.visibleProperty,
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

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 5,
      children: [ lightModeRadioButtonGroup, wavelengthControl, absorptionWavelengthsInfoButton ]
    } );

    super( content, options );
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

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );