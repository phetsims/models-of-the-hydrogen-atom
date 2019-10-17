// Copyright 2019, University of Colorado Boulder

/**
 * MOTHAOptionsNode is the user interface for global options, accessed via PhET > Options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const ProjectorModeCheckbox = require( 'JOIST/ProjectorModeCheckbox' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class MOTHAOptionsNode extends VBox {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = merge( {

        // phet-io
        tandem: Tandem.required
      }, options );

      // Projector Mode checkbox
      const projectorModeCheckbox = new ProjectorModeCheckbox( MOTHAColorProfile, {
        tandem: options.tandem.createTandem( 'projectorModeCheckbox' )
      } );

      assert && assert( !options.children, 'MOTHAOptionsNode sets children' );
      options.children = [ projectorModeCheckbox ];

      super( options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'MOTHAOptionsNode', MOTHAOptionsNode );
} );