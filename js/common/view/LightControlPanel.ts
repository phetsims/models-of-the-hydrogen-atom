// Copyright 2016-2024, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { HBox, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import { LightMode } from '../model/LightMode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HorizontalAquaRadioButtonGroup from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import { MOTHAWavelengthControl } from './MOTHAWavelengthControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type LightControlPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export class LightControlPanel extends Panel {

  public constructor( lightModeProperty: Property<LightMode>,
                      monochromaticWavelengthProperty: Property<number>,
                      providedOptions: LightControlPanelOptions ) {

    const options = optionize<LightControlPanelOptions, SelfOptions, PanelOptions>()( {

      //TODO PanelOptions
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // Wavelength control
    const monochromaticWavelengthControlTandem = options.tandem.createTandem( 'monochromaticWavelengthControl' );
    const monochromaticWavelengthControl = new MOTHAWavelengthControl( monochromaticWavelengthProperty, {
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: monochromaticWavelengthControlTandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: monochromaticWavelengthControlTandem
    } );

    // 'Absorption Wavelengths' info button
    const absorptionWavelengthsInfoButton = new HBox( {
      visibleProperty: monochromaticWavelengthControl.visibleProperty,
      spacing: 5,
      children: [
        new InfoButton( {
          iconFill: 'rgb( 41, 106, 163 )',
          scale: 0.4,
          listener: () => {
            //TODO
          },
          tandem: Tandem.OPT_OUT // because we're instrumenting the button + label
        } ),
        new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
          font: new PhetFont( 14 ),
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 0.8 * monochromaticWavelengthControl.width
        } )
      ]
    } );

    const textOptions = {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 0.4 * monochromaticWavelengthControl.width
    };

    const radioButtonGroupItems: AquaRadioButtonGroupItem<LightMode>[] = [
      {
        value: 'white',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.whiteStringProperty, textOptions ),
        tandemName: 'whiteRadioButton'
      },
      {
        value: 'monochromatic',
        createNode: () => new Text( ModelsOfTheHydrogenAtomStrings.monochromaticStringProperty, textOptions ),
        tandemName: 'monochromaticRadioButton'
      }
    ];

    const lightModeRadioButtonGroup = new HorizontalAquaRadioButtonGroup( lightModeProperty, radioButtonGroupItems, {
      maxWidth: monochromaticWavelengthControl.width,
      spacing: 15,
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 15,
      children: [ lightModeRadioButtonGroup, monochromaticWavelengthControl, absorptionWavelengthsInfoButton ]
    } );

    super( content, options );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );