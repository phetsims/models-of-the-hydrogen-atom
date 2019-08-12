// Copyright 2015-2019, University of Colorado Boulder

/**
 * Visual representation of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  const DIAMETER = 9;

  class ElectronNode extends ShadedSphereNode {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};
      options.mainColor = 'rgb( 120, 120, 255 )';
      options.highlightColor = 'rgb( 140, 140, 255 )';

      super( DIAMETER, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );
} );