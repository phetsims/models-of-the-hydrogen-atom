// Copyright 2016-2024, University of Colorado Boulder

/**
 * LightControlPanel contains the controls for configuring the mode and wavelength of the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAColors from '../MOTHAColors.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { MOTHAWavelengthControl } from './MOTHAWavelengthControl.js';
import Light from '../model/Light.js';
import LightModeRadioButtonGroup from './LightModeRadioButtonGroup.js';
import AbsorptionWavelengthsDialog from './AbsorptionWavelengthsDialog.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from '../model/HydrogenAtom.js';

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

    // 'Absorption Wavelengths' button
    const absorptionWavelengthsButtonTandem = options.tandem.createTandem( 'absorptionWavelengthsButton' );
    const absorptionWavelengthsButton = new RectangularPushButton( {
      content: new Text( ModelsOfTheHydrogenAtomStrings.absorptionWavelengthsStringProperty, {
        font: new PhetFont( 12 ),
        maxWidth: 0.8 * monochromaticWavelengthControl.width
      } ),
      listener: () => absorptionWavelengthsDialog.show(),

      //TODO Why is Absorption Wavelengths not relevant for white light?
      visibleProperty: new DerivedProperty( [ light.lightModeProperty, hydrogenAtomProperty ],
        ( lightMode, hydrogenAtom ) => ( lightMode === 'monochromatic' ) && hydrogenAtom.hasTransitionWavelengths, {
          phetioValueType: BooleanIO,
          tandem: absorptionWavelengthsButtonTandem.createTandem( 'visibleProperty' )
        } ),
      tandem: absorptionWavelengthsButtonTandem
    } );

    const content = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      align: 'center',
      spacing: 20,
      children: [ lightModeRadioButtonGroup, monochromaticWavelengthControl, absorptionWavelengthsButton ]
    } );

    super( content, options );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightControlPanel', LightControlPanel );