// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionTransitionTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      providedOptions: AbsorptionTransitionTextOptions ) {

    //TODO Would GatedVisibleProperty be useful here?
    const visibleProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
      phetioDocumentation: 'Set this to false to permanently hide state transition display. ' +
                           'Otherwise, visibility depends on whether the light is set to an absorption wavelength.',
      phetioFeatured: true
    } );

    const options = optionize<AbsorptionTransitionTextOptions, SelfOptions, RichTextOptions>()( {

      // RichTextOptions
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      visibleProperty: new DerivedProperty(
        [ lightModeProperty, isQuantumModelProperty, isExperimentProperty, visibleProperty ],
        ( lightMode, isQuantumModel, isExperiment, visible ) =>
          ( lightMode === 'monochromatic' ) && isQuantumModel && !isExperiment && visible )
    }, providedOptions );

    const stringProperty = new DerivedStringProperty( [ MOTHASymbols.nStringProperty, wavelengthProperty ],
      ( n, wavelength ) => {
        const transition = photonAbsorptionModel.getTransition( wavelength );
        if ( transition ) {
          return `${n} = ${transition.n1} ${MOTHASymbols.rightArrow} ${transition.n2}`;
        }
        else {
          return '';
        }
      } );

    super( stringProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionTransitionText', AbsorptionTransitionText );