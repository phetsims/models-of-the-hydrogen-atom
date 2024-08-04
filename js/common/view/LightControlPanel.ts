// Copyright 2016-2024, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { HBox, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { MOTHAWavelengthControl } from './MOTHAWavelengthControl.js';
import Light from '../model/Light.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import AbsorptionWavelengthsDialog from './AbsorptionWavelengthsDialog.js';

type SelfOptions = EmptySelfOptions;

type LightControlPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export class LightControlPanel extends Panel {

  public constructor( light: Light, providedOptions: LightControlPanelOptions ) {

    const options = optionize<LightControlPanelOptions, SelfOptions, PanelOptions>()( {

      //TODO PanelOptions
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // Wavelength control
    const monochromaticWavelengthControl = new MOTHAWavelengthControl( light.monochromaticWavelengthProperty, light.lightModeProperty, {
      tandem: options.tandem.createTandem( 'monochromaticWavelengthControl' )
    } );

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( light.lightModeProperty, {
      maxWidth: monochromaticWavelengthControl.width,
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    const absorptionWavelengthsDialog = new AbsorptionWavelengthsDialog( {
      tandem: options.tandem.createTandem( 'absorptionWavelengthsDialog' )
    } );

    // 'Absorption Wavelengths' info button
    //TODO Factor out absorptionWavelengthsButton.
    //TODO Using InfoButton does not seem appropriate here.
    const absorptionWavelengthsButton = new InfoButton( {
      iconFill: 'rgb( 41, 106, 163 )',
      scale: 0.4,
      listener: () => absorptionWavelengthsDialog.show(),
      tandem: options.tandem.createTandem( 'absorptionWavelengthsButton' ),
      phetioEnabledPropertyInstrumented: false
    } );

    const hBox = new HBox( {

      //TODO Why is Absorption Wavelengths not relevant for white light?
      visibleProperty: monochromaticWavelengthControl.visibleProperty,
      spacing: 5,
      children: [
        absorptionWavelengthsButton,

        //TODO Should the button label be pressable?
        new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
          visibleProperty: absorptionWavelengthsButton.visibleProperty,
          font: new PhetFont( 14 ),
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 0.8 * monochromaticWavelengthControl.width
        } )
      ]
    } );

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 15,
      children: [ lightModeRadioButtonGroup, monochromaticWavelengthControl, hBox ]
    } );

    super( content, options );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );