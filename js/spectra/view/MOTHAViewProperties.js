// Copyright 2015-2018, University of Colorado Boulder

/**
 * Properties that are specific to the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function MOTHAViewProperties() {

    //TODO should clock-related stuff be in model?
    // @public {string} clock speed
    this.clockSpeedProperty = new StringProperty( 'normal', {
      validValues: [ 'fast', 'normal', 'slow' ]
    } );

    // @public {boolean} is the simulation running?
    this.runningProperty = new BooleanProperty( true );

    //TODO should mode be in model?
    // @public {string} whether we're viewing an experiment or predictive model
    this.modeProperty = new StringProperty( 'experiment', {
      validValues: [ 'experiment', 'model' ]
    } );

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

  modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );

  return inherit( Object, MOTHAViewProperties, {

    // @public
    reset: function() {
      this.clockSpeedProperty.reset();
      this.runningProperty.reset();
      this.modeProperty.reset();
      this.absorptionWavelengthsVisibleProperty.reset();
      this.spectrometerExpandedProperty.reset();
      this.energyDiagramVisibleProperty.reset();
      this.numberOfSnapshotsProperty.reset();
    }
  } );
} );
