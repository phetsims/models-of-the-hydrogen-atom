// Copyright 2022, University of Colorado Boulder

//TODO white beam is not visible on white background in projector mode
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = EmptySelfOptions;

type ShowAbsorptionWavelengthsCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class ShowAbsorptionWavelengthsCheckbox extends Checkbox {

  public constructor( absorptionWavelengthsVisibleProperty: Property<boolean>,
                      hydrogenAtomModelProperty: TReadOnlyProperty<HydrogenAtom>,
                      providedOptions: ShowAbsorptionWavelengthsCheckboxOptions ) {

    const options = optionize<ShowAbsorptionWavelengthsCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // Visible if the hydrogen-atom model has transition wavelengths
      visibleProperty: new DerivedProperty( [ hydrogenAtomModelProperty ],
        hydrogenAtomModel => hydrogenAtomModel.hasTransitionWavelengths, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } ),
      checkboxColor: MOTHAColors.showAbsorptionWavelengthCheckboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.showAbsorptionWavelengthCheckboxFillProperty
    }, providedOptions );

    const text = new Text( ModelsOfTheHydrogenAtomStrings.showAbsorptionWavelengthsStringProperty, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.showAbsorptionWavelengthTextFillProperty,
      maxWidth: 250,
      tandem: options.tandem.createTandem( 'text' )
    } );

    super( absorptionWavelengthsVisibleProperty, text, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ShowAbsorptionWavelengthsCheckbox', ShowAbsorptionWavelengthsCheckbox );