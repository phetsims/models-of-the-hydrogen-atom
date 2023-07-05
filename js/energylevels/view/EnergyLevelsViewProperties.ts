// Copyright 2019-2023, University of Colorado Boulder

/**
 * EnergyLevelsViewProperties defines Properties that are specific to the view in the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAViewProperties, { MOTHAViewPropertiesOptions } from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsViewPropertiesOptions = SelfOptions & MOTHAViewPropertiesOptions;

export default class EnergyLevelsViewProperties extends MOTHAViewProperties {

  //  is the Electron Energy Level accordion box expanded?
  public readonly electronEnergyLevelExpandedProperty: Property<boolean>;

  public constructor( providedOptions: EnergyLevelsViewPropertiesOptions ) {
    super( providedOptions );

    this.electronEnergyLevelExpandedProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'electronEnergyLevelExpandedProperty' )
    } );
  }

  public override reset(): void {
    super.reset();
    this.electronEnergyLevelExpandedProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsViewProperties', EnergyLevelsViewProperties );