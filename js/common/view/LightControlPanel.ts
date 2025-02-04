// Copyright 2016-2025, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import AbsorptionTransitionText from './AbsorptionTransitionText.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import { MonochromaticWavelengthControl } from './MonochromaticWavelengthControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { LightMode } from '../model/LightMode.js';
import { ExperimentOrModel } from '../model/MOTHAModel.js';

export class LightControlPanel extends Panel {

  public constructor( lightModeProperty: Property<LightMode>,
                      monochromaticWavelengthProperty: NumberProperty,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      experimentOrModelProperty: TReadOnlyProperty<ExperimentOrModel>,
                      tandem: Tandem ) {

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( lightModeProperty,
      tandem.createTandem( 'lightModeRadioButtonGroup' ) );

    const absorptionTransitionText = new AbsorptionTransitionText( monochromaticWavelengthProperty,
      experimentOrModelProperty, isQuantumModelProperty, lightModeProperty, tandem.createTandem( 'absorptionTransitionText' ) );

    const monochromaticWavelengthControl = new MonochromaticWavelengthControl( monochromaticWavelengthProperty, lightModeProperty,
      tandem.createTandem( 'monochromaticWavelengthControl' ) );

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

    super( content, {
      isDisposable: false,
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty,
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      xMargin: 5,
      yMargin: 10,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );