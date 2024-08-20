// Copyright 2016-2024, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { VBox } from '../../../../scenery/js/imports.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import { MonochromaticWavelengthControl } from './MonochromaticWavelengthControl.js';
import Light from '../model/Light.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import AbsorptionTransitionText from './AbsorptionTransitionText.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BohrModel from '../model/BohrModel.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type LightControlPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export class LightControlPanel extends Panel {

  public constructor( light: Light, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, providedOptions: LightControlPanelOptions ) {

    const options = optionize4<LightControlPanelOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // PanelOptions
      isDisposable: false,
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty
    }, providedOptions );

    const monochromaticWavelengthControl = new MonochromaticWavelengthControl( light.monochromaticWavelengthProperty, light.lightModeProperty, {
      tandem: options.tandem.createTandem( 'monochromaticWavelengthControl' )
    } );

    const absorptionTransitionText = new AbsorptionTransitionText( light.monochromaticWavelengthProperty, {
      visibleProperty: new DerivedProperty( [ light.lightModeProperty, hydrogenAtomProperty ],
        ( lightMode, hydrogenAtom ) => ( lightMode === 'monochromatic' ) && ( hydrogenAtom instanceof BohrModel ) ),
      tandem: options.tandem.createTandem( 'absorptionTransitionText' )
    } );

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( light.lightModeProperty, {
      maxWidth: monochromaticWavelengthControl.width,
      tandem: options.tandem.createTandem( 'lightModeRadioButtonGroup' )
    } );

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 10,
      children: [
        lightModeRadioButtonGroup,
        absorptionTransitionText,
        monochromaticWavelengthControl
      ]
    } );

    super( content, options );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );