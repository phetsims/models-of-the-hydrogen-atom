// Copyright 2015-2019, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const ClockSpeeds = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ClockSpeeds' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  class MOTHAViewProperties {

    constructor() {

      //TODO should clock-related stuff be in model?
      // @public clock speed
      this.clockSpeedProperty = new EnumerationProperty( ClockSpeeds, ClockSpeeds.NORMAL );

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
      this.clockSpeedProperty.reset();
      this.runningProperty.reset();
      this.experimentEnabledProperty.reset();
      this.absorptionWavelengthsVisibleProperty.reset();
      this.spectrometerExpandedProperty.reset();
      this.electronEnergyLevelExpandedProperty.reset();
      this.numberOfSnapshotsProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );
} );
