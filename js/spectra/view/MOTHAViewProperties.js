// Copyright 2015-2016, University of Colorado Boulder

/**
 * Properties that are specific to the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function MOTHAViewProperties() {

    //TODO should clock-related stuff be in model?
    // @public {string} clock speed
    this.clockSpeedProperty = new Property( 'normal', {
      allowedValues: [ 'fast', 'normal', 'slow' ]
    } );

    // @public {boolean} is the simulation running?
    this.runningProperty = new Property( true, {
      allowedValues: [ true, false ]
    } );

    //TODO should mode be model?
    // @public {string} whether we're viewing an experiment or predictive model
    this.modeProperty = new Property( 'experiment', {
      allowedValues: [ 'experiment', 'model' ]
    } );

    // @public {boolean} are absorption wavelengths indicated on the wavelength slider?
    this.absorptionWavelengthsVisibleProperty = new Property( false, {
      allowedValues: [ true, false ]
    } );

    // @public {boolean} is the spectrometer expanded?
    this.spectrometerExpandedProperty = new Property( false, {
      allowedValues: [ true, false ]
    } );

    // @public {boolean} is the electron level energy diagram visible?
    this.energyDiagramVisibleProperty = new Property( false, {
      allowedValues: [ true, false ]
    } );

    //TODO for prototyping
    // @public {number} number of spectrometer snapshots
    this.numberOfSnapshotsProperty = new Property( 0 );
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
