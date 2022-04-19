// Copyright 2019-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * EnergyLevelsViewProperties defines Properties that are specific to the view in the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import MOTHAViewProperties from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class EnergyLevelsViewProperties extends MOTHAViewProperties {

  constructor() {

    super();

    // @public {boolean} is the Electron Energy Level accordion box expanded?
    this.electronEnergyLevelExpandedProperty = new BooleanProperty( false );
  }

  // @public
  reset() {
    super.reset();
    this.electronEnergyLevelExpandedProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsViewProperties', EnergyLevelsViewProperties );
export default EnergyLevelsViewProperties;