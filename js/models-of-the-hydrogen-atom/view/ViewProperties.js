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

  /**
   * @constructor
   */
  function ViewProperties() {

    PropertySet.call( this, {
      mode: 'experiment' // {string} 'experiment'|'prediction'
    } );

    this.modeProperty.link( function( mode ) {
      assert && assert( mode === 'experiment' || mode === 'prediction' );
    } );
  }

  return inherit( PropertySet, ViewProperties );
} );
