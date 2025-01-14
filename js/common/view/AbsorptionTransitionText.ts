// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      isQuantumModelProperty: TReadOnlyProperty<boolean>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const visibleProperty = new DerivedProperty(
      [ lightModeProperty, isQuantumModelProperty, isExperimentProperty ],
      ( lightMode, isQuantumModel, isExperiment ) => ( lightMode === 'monochromatic' ) && isQuantumModel && !isExperiment );

    // Provide PhET-iO clients with a way to permanently hide this text via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, tandem );

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

    super( stringProperty, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      visibleProperty: gatedVisibleProperty,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionTransitionText', AbsorptionTransitionText );