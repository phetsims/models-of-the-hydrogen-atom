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
  var PropertySet = require( 'AXON/PropertySet' );

  // valid values for the 'mode' property
  var MODE_VALUES = [ 'experiment', 'model' ];
  var CLOCK_SPEED_VALUES = [ 'fast', 'normal', 'slow' ];

  /**
   * @constructor
   */
  function MOTHAViewProperties() {

    // @public
    PropertySet.call( this, {
      clockSpeed: 'normal', // {string} clock speed, see CLOCK_SPEED_VALUES
      running: true, // {boolean} is the simulation running?
      mode: 'experiment', // {string} whether we're viewing an experiment or predictive model, see MODE_VALUES
      absorptionWavelengthsVisible: false, // {boolean} are absorption wavelengths indicated on the wavelength slider?
      spectrometerVisible: true, // {boolean} is the spectrometer visible?
      energyDiagramVisible: false // {boolean} is the electron level energy diagram visible?
    } );

    // validate clockSpeed Property
    this.clockSpeedProperty.link( function( clockSpeed ) {
      assert && assert( _.contains( CLOCK_SPEED_VALUES, clockSpeed ), 'invalid clockSpeed: ' + clockSpeed );
    } );

    // validate mode Property
    this.modeProperty.link( function( mode ) {
      assert && assert( _.contains( MODE_VALUES, mode ), 'invalid mode: ' + mode );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );

  return inherit( PropertySet, MOTHAViewProperties );
} );
