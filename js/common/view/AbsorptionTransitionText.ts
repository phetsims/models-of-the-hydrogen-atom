// Copyright 2024-2025, University of Colorado Boulder

/**
 * AbsorptionTransitionText displays the electron state transition (possibly undefined) associated with a wavelength.
 * This appears above the monochromatic wavelength control in the control panel for the light source.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import { ModelOrExperiment } from '../model/MOTHAModel.js';
import PhotonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHASymbols from '../MOTHASymbols.js';

export default class AbsorptionTransitionText extends RichText {

  public constructor( wavelengthProperty: TReadOnlyProperty<number>,
                      modelOrExperimentProperty: TReadOnlyProperty<ModelOrExperiment>,
                      isQuantumAtomProperty: TReadOnlyProperty<boolean>,
                      lightModeProperty: TReadOnlyProperty<LightMode>,
                      tandem: Tandem ) {

    const visibleProperty = new DerivedProperty(
      [ modelOrExperimentProperty, isQuantumAtomProperty, lightModeProperty, wavelengthProperty ],
      ( modelOrExperiment, isQuantumAtom, lightMode, wavelength ) =>
        ( modelOrExperiment === 'model' &&
          isQuantumAtom &&
          lightMode === 'monochromatic' &&
          PhotonAbsorptionModel.instance.isTransitionWavelength( wavelength ) ) );

    // Provides PhET-iO clients with a way to permanently hide this Node via 'selfVisibleProperty'.
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, tandem );

    // Note that we cannot do something as simple as setting this string to '' or ' ' when the wavelength is not a
    // transition wavelength. On some platforms that changes the bounds of this Node, and causes LightControlPanel
    // to vertically resize. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/127.
    const stringProperty = new DerivedStringProperty( [ MOTHASymbols.nStringProperty, wavelengthProperty ],
      ( n, wavelength ) => {
        const transition = PhotonAbsorptionModel.instance.getTransition( wavelength );
        const n1 = transition ? transition.n1 : '?';
        const n2 = transition ? transition.n2 : '?';
        return `${n} = ${n1} ${MOTHASymbols.rightArrow} ${n2}`;
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