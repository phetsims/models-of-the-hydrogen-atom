// Copyright 2015-2022, University of Colorado Boulder

//TODO white beam is not visible on white background in projector mode
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import HydrogenAtom from '../model/HydrogenAtom.js';

type SelfOptions = {};

type ShowAbsorptionWavelengthsCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class ShowAbsorptionWavelengthsCheckbox extends Checkbox {

  public constructor( absorptionWavelengthsVisibleProperty: IProperty<boolean>,
                      hydrogenAtomModelProperty: IReadOnlyProperty<HydrogenAtom>,
                      providedOptions: ShowAbsorptionWavelengthsCheckboxOptions ) {

    const options = optionize<ShowAbsorptionWavelengthsCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // Visible if the hydrogen-atom model has transition wavelengths
      visibleProperty: new DerivedProperty( [ hydrogenAtomModelProperty ],
        hydrogenAtomModel => hydrogenAtomModel.hasTransitionWavelengths, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
        } ),
      checkboxColor: MOTHAColors.showAbsorptionWavelengthCheckboxStrokeProperty,
      checkboxColorBackground: MOTHAColors.showAbsorptionWavelengthCheckboxFillProperty
    }, providedOptions );

    const labelNode = new Text( modelsOfTheHydrogenAtomStrings.showAbsorptionWavelengths, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.showAbsorptionWavelengthTextFillProperty,
      maxWidth: 250,
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    super( labelNode, absorptionWavelengthsVisibleProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ShowAbsorptionWavelengthsCheckbox', ShowAbsorptionWavelengthsCheckbox );