// Copyright 2016-2024, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { NodeTranslationOptions, VBox } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import { MonochromaticWavelengthControl } from './MonochromaticWavelengthControl.js';
import Light from '../model/Light.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import AbsorptionWavelengthsDialog from './AbsorptionWavelengthsDialog.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import AbsorptionWavelengthsButton from './AbsorptionWavelengthsButton.js';
import AbsorptionTransitionDisplay from './AbsorptionTransitionDisplay.js';

type SelfOptions = EmptySelfOptions;

type LightControlPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export class LightControlPanel extends Panel {

  public constructor( light: Light, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, providedOptions: LightControlPanelOptions ) {

    const options = optionize<LightControlPanelOptions, SelfOptions, PanelOptions>()( {

      //TODO PanelOptions
      isDisposable: false,
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // Wavelength control
    const monochromaticWavelengthControl = new MonochromaticWavelengthControl( light.monochromaticWavelengthProperty, light.lightModeProperty, {
      tandem: options.tandem.createTandem( 'monochromaticWavelengthControl' )
    } );

    const absorptionTransitionDisplay = new AbsorptionTransitionDisplay( light.monochromaticWavelengthProperty,
      options.tandem.createTandem( 'absorptionTransitionDisplay' ) );

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( light.lightModeProperty, {
      maxWidth: monochromaticWavelengthControl.width,
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    const absorptionWavelengthsDialog = new AbsorptionWavelengthsDialog( light.monochromaticWavelengthProperty, {
      tandem: options.tandem.createTandem( 'absorptionWavelengthsDialog' )
    } );

    //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/31 Replace with a Checkbox
    const absorptionWavelengthsButton = new AbsorptionWavelengthsButton( light.lightModeProperty, hydrogenAtomProperty,
      absorptionWavelengthsDialog, options.tandem.createTandem( 'absorptionWavelengthsButton' ) );

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 10,
      children: [
        lightModeRadioButtonGroup,
        new VBox( {
          excludeInvisibleChildrenFromBounds: false,
          spacing: 5,
          children: [
            absorptionTransitionDisplay,
            monochromaticWavelengthControl
          ]
        } ),
        absorptionWavelengthsButton
      ]
    } );

    super( content, options );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );