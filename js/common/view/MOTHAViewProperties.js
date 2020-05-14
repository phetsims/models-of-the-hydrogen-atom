// Copyright 2015-2020, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class MOTHAViewProperties {

  constructor() {

    //TODO should clock-related stuff be in model?
    // @public time speed
    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed, TimeSpeed.NORMAL );

    // @public {boolean} is the simulation running?
    this.runningProperty = new BooleanProperty( true );

    //TODO should mode be in model?
    // @public whether we're viewing an experiment (true) or predictive (false) model
    this.experimentEnabledProperty = new BooleanProperty( true );

    // @public {boolean} are absorption wavelengths indicated on the wavelength slider?
    this.absorptionWavelengthsVisibleProperty = new BooleanProperty( false );

    // @public {boolean} is the Spectrometer accordion box expanded?
    this.spectrometerExpandedProperty = new BooleanProperty( false );

    // @public {boolean} is the Electron Energy Level accordion box expanded?
    this.electronEnergyLevelExpandedProperty = new BooleanProperty( false );

    //TODO for prototyping
    // @public {number} number of spectrometer snapshots
    this.numberOfSnapshotsProperty = new NumberProperty( 0 );
  }

  // @public
  reset() {
    this.timeSpeedProperty.reset();
    this.runningProperty.reset();
    this.experimentEnabledProperty.reset();
    this.absorptionWavelengthsVisibleProperty.reset();
    this.spectrometerExpandedProperty.reset();
    this.electronEnergyLevelExpandedProperty.reset();
    this.numberOfSnapshotsProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );
export default MOTHAViewProperties;