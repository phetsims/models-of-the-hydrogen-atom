// Copyright 2016-2022, University of Colorado Boulder

/**
 * MonochromaticControls provides controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import WavelengthSlider from '../../../../scenery-phet/js/WavelengthSlider.js';
import { NodeTranslationOptions, Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import HydrogenAtomModel from '../model/HydrogenAtomModel.js';
import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {};

type MonochromaticControlsOptions = SelfOptions & NodeTranslationOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MonochromaticControls extends VBox {

  constructor( experimentEnabledProperty: IProperty<boolean>, hydrogenAtomModelProperty: IProperty<HydrogenAtomModel>,
               wavelengthProperty: IProperty<number>, absorptionWavelengthsVisibleProperty: IProperty<boolean>,
               providedOptions: MonochromaticControlsOptions ) {

    const options = optionize<MonochromaticControlsOptions, SelfOptions, VBoxOptions>()( {
      align: 'center',
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    }, providedOptions );

    // wavelength slider
    const wavelengthSlider = new WavelengthSlider( wavelengthProperty, {
      trackWidth: 250,
      trackHeight: 20,
      thumbTouchAreaXDilation: 12,
      thumbTouchAreaYDilation: 0,
      maxTweakersHeight: 20,
      thumbWidth: 25,
      thumbHeight: 25,
      valueYSpacing: 6,
      valueFill: 'white',
      valueFont: new PhetFont( 16 ),
      tandem: options.tandem.createTandem( 'wavelengthSlider' )
    } );

    // 'Show absorption wavelengths' checkbox
    const showAbsorptionsWavelengthText = new Text( modelsOfTheHydrogenAtomStrings.showAbsorptionWavelengths, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.showAbsorptionWavelengthTextFillProperty,
      maxWidth: 0.85 * wavelengthSlider.width,
      tandem: options.tandem.createTandem( 'showAbsorptionsWavelengthText' )
    } );
    const showAbsorptionsWavelengthCheckbox = new Checkbox( showAbsorptionsWavelengthText, absorptionWavelengthsVisibleProperty, {
      checkboxColor: MOTHAColors.showAbsorptionWavelengthCheckboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.showAbsorptionWavelengthCheckboxFillProperty,
      tandem: options.tandem.createTandem( 'showAbsorptionsWavelengthCheckbox' )
    } );

    options.children = [ wavelengthSlider, showAbsorptionsWavelengthCheckbox ];

    super( options );

    // show the checkbox only if it's relevant
    Property.multilink(
      [ experimentEnabledProperty, hydrogenAtomModelProperty ],
      ( experimentEnabled, hydrogenAtomModel ) => {
        showAbsorptionsWavelengthCheckbox.visible = ( experimentEnabled || hydrogenAtomModel.hasTransitionWavelengths );
      } );

    // show absorption wavelengths for relevant models
    Property.multilink(
      [ hydrogenAtomModelProperty, absorptionWavelengthsVisibleProperty ],
      ( hydrogenAtomModel, absorptionWavelengthsVisible ) => {
        //TODO
        // wavelengthSlider.absorptionWavelengthsVisible = hydrogenAtomModel.hasTransitionWavelengths && absorptionWavelengthsVisible;
      } );
  }
}

modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );