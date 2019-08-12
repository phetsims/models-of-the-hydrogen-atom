// Copyright 2015-2019, University of Colorado Boulder

/**
 * Properties that are specific to the view.
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
  const ModelModes = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ModelModes' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  class MOTHAViewProperties {

    constructor() {

      //TODO should clock-related stuff be in model?
      // @public clock speed
      this.clockSpeedProperty = new EnumerationProperty( ClockSpeeds, ClockSpeeds.NORMAL );

      // @public {boolean} is the simulation running?
      this.runningProperty = new BooleanProperty( true );

      //TODO should mode be in model?
      // @public whether we're viewing an experiment or predictive model
      this.modeProperty = new EnumerationProperty( ModelModes, ModelModes.EXPERIMENT );

      // @public {boolean} are absorption wavelengths indicated on the wavelength slider?
      this.absorptionWavelengthsVisibleProperty = new BooleanProperty( false );

      // @public {boolean} is the spectrometer expanded?
      this.spectrometerExpandedProperty = new BooleanProperty( false );

      // @public {boolean} is the electron level energy diagram visible?
      this.energyDiagramVisibleProperty = new BooleanProperty( false );

      //TODO for prototyping
      // @public {number} number of spectrometer snapshots
      this.numberOfSnapshotsProperty = new NumberProperty( 0 );
    }

    // @public
    reset() {
      this.clockSpeedProperty.reset();
      this.runningProperty.reset();
      this.modeProperty.reset();
      this.absorptionWavelengthsVisibleProperty.reset();
      this.spectrometerExpandedProperty.reset();
      this.energyDiagramVisibleProperty.reset();
      this.numberOfSnapshotsProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );
} );
