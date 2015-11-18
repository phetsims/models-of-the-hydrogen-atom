// Copyright 2015, University of Colorado Boulder

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
  var MODE_VALUES = [ 'experiment', 'prediction' ];

  /**
   * @constructor
   */
  function ViewProperties() {

    // @public
    PropertySet.call( this, {
      mode: 'experiment', // {string} whether we're viewing an experiment or predictive model, see MODE_VALUES
      absorptionWavelengthsVisible: false, // {boolean} are absorption wavelengths indicated on the wavelength slider?
      spectrometerVisible: true, // {boolean} is the spectrometer visible?
      energyDiagramVisible: false // {boolean} is the electron level energy diagram visible?
    } );

    // validate mode Property
    this.modeProperty.link( function( mode ) {
      assert && assert( _.indexOf( MODE_VALUES, mode ) !== -1 );
    } );
  }

  modelsOfTheHydrogenAtom.register( 'ViewProperties', ViewProperties );

  return inherit( PropertySet, ViewProperties );
} );
