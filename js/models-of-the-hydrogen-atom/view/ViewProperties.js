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
  var PropertySet = require( 'AXON/PropertySet' );

  // valid values for the 'mode' property
  var MODE_VALUES = [ 'experiment', 'prediction' ];

  /**
   * @constructor
   */
  function ViewProperties() {

    // @public
    PropertySet.call( this, {
      mode: 'experiment' // {string} 'experiment'|'prediction'
    } );

    this.modeProperty.link( function( mode ) {
      assert && assert( _.indexOf( MODE_VALUES, mode ) !== -1 );
    } );
  }

  return inherit( PropertySet, ViewProperties );
} );
