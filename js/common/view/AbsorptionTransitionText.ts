// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

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
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';

type SelfOptions = EmptySelfOptions;

type AbsorptionTransitionTextOptions = SelfOptions & PickRequired<RichTextOptions, 'tandem'>;

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      providedOptions: AbsorptionTransitionTextOptions ) {

    const visibleProperty = new DerivedProperty(
      [ lightModeProperty, isQuantumModelProperty, isExperimentProperty ],
      ( lightMode, isQuantumModel, isExperiment ) => ( lightMode === 'monochromatic' ) && isQuantumModel && !isExperiment );

    // Provide PhET-iO clients with a way to permanently hide this text via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const options = optionize<AbsorptionTransitionTextOptions, SelfOptions, RichTextOptions>()( {

      // RichTextOptions
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      visibleProperty: gatedVisibleProperty
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