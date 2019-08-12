// Copyright 2015-2019, University of Colorado Boulder

/**
 * Visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  const DIAMETER = 11;

  class NeutronNode extends ShadedSphereNode {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};
      options.mainColor = 'rgb( 128, 128, 128 )';
      options.highlightColor = 'rgb( 175, 175, 175 )';

      super( DIAMETER, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );
} );