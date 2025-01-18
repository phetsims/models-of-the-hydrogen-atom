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
import LightSource from '../model/LightSource.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import AbsorptionTransitionText from './AbsorptionTransitionText.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import { MonochromaticWavelengthControl } from './MonochromaticWavelengthControl.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export class LightControlPanel extends Panel {

  public constructor( lightSource: LightSource,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const monochromaticWavelengthControl = new MonochromaticWavelengthControl( lightSource.monochromaticWavelengthProperty, lightSource.lightModeProperty,
      tandem.createTandem( 'monochromaticWavelengthControl' ) );

    const absorptionTransitionText = new AbsorptionTransitionText( lightSource.monochromaticWavelengthProperty,
      lightSource.lightModeProperty, isQuantumModelProperty, isExperimentProperty,
      tandem.createTandem( 'absorptionTransitionText' ) );

    const lightModeRadioButtonGroup = new LightModeRadioButtonGroup( lightSource.lightModeProperty, {
      maxWidth: monochromaticWavelengthControl.width,
      tandem: tandem.createTandem( 'lightModeRadioButtonGroup' )
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

    super( content, {
      isDisposable: false,
      fill: MOTHAColors.panelFillColorProperty,
      stroke: MOTHAColors.panelStrokeColorProperty,
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      xMargin: 5,
      yMargin: 10,
      tandem: tandem,
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.addLinkedElement( lightSource );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );