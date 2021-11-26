// Copyright 2019-2021, University of Colorado Boulder

/**
 * MOTHAOptionsNode is the user interface for global options, accessed via PhET > Options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import merge from '../../../../phet-core/js/merge.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class MOTHAOptionsNode extends VBox {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // Projector Mode checkbox
    const projectorModeCheckbox = new ProjectorModeCheckbox( {
      tandem: options.tandem.createTandem( 'projectorModeCheckbox' )
    } );

    assert && assert( !options.children, 'MOTHAOptionsNode sets children' );
    options.children = [ projectorModeCheckbox ];

    super( options );

    // @private
    this.disposeMOTHAOptionsNode = () => {
      projectorModeCheckbox.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeMOTHAOptionsNode();
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAOptionsNode', MOTHAOptionsNode );
export default MOTHAOptionsNode;