// Copyright 2024-2025, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 * This appears above the monochromatic wavelength control in the control panel for the light source.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import { ExperimentOrModel } from '../model/MOTHAModel.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>,
                      experimentOrModelProperty: TReadOnlyProperty<ExperimentOrModel>,
                      isQuantumAtomProperty: TReadOnlyProperty<boolean>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      tandem: Tandem ) {

    const visibleProperty = new DerivedProperty(
      [ experimentOrModelProperty, isQuantumAtomProperty, lightModeProperty ],
      ( experimentOrModel, isQuantumAtom, lightMode ) =>
        ( experimentOrModel === 'model' && isQuantumAtom && lightMode === 'monochromatic' ) );

    // Provides PhET-iO clients with a way to permanently hide this Node via 'selfVisibleProperty'.
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, tandem );

    const stringProperty = new DerivedStringProperty( [ MOTHASymbols.nStringProperty, wavelengthProperty ],
      ( n, wavelength ) => {
        const transition = photonAbsorptionModel.getTransition( wavelength );
        return transition ? `${n} = ${transition.n1} ${MOTHASymbols.rightArrow} ${transition.n2}` : '';
      } );

    super( stringProperty, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 100,
      visibleProperty: gatedVisibleProperty,
      tandem: tandem,
      phetioDocumentation: 'When the selected wavelength is an absorption wavelength, this element displays the electron state transition.'
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionTransitionText', AbsorptionTransitionText );