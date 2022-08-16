// Copyright 2016-2022, University of Colorado Boulder

/**
 * MonochromaticControls provides controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import WavelengthSlider from '../../../../scenery-phet/js/WavelengthSlider.js';
import { NodeTranslationOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { ModelMode } from '../model/ModelMode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { LightMode } from '../model/LightMode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ShowAbsorptionWavelengthsCheckbox from './ShowAbsorptionWavelengthsCheckbox.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = EmptySelfOptions;

type MonochromaticControlsOptions = SelfOptions & NodeTranslationOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MonochromaticControls extends VBox {

  public constructor( modelModeProperty: TProperty<ModelMode>,
                      hydrogenAtomModelProperty: TProperty<HydrogenAtom>,
                      wavelengthProperty: TProperty<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      absorptionWavelengthsVisibleProperty: Property<boolean>,
                      providedOptions: MonochromaticControlsOptions ) {

    const options = optionize<MonochromaticControlsOptions, SelfOptions, VBoxOptions>()( {

      // Visible when light mode is 'monochromatic'
      visibleProperty: new DerivedProperty( [ lightModeProperty ], lightMode => ( lightMode === 'monochromatic' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
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
    //TODO wavelengthSlider.absorptionWavelengthsVisible = hydrogenAtomModel.hasTransitionWavelengths && absorptionWavelengthsVisible;

    // 'Show absorption wavelengths' checkbox
    const showAbsorptionWavelengthsCheckbox = new ShowAbsorptionWavelengthsCheckbox(
      absorptionWavelengthsVisibleProperty, hydrogenAtomModelProperty, {
        tandem: options.tandem.createTandem( 'showAbsorptionWavelengthsCheckbox' )
      } );

    options.children = [ wavelengthSlider, showAbsorptionWavelengthsCheckbox ];

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );