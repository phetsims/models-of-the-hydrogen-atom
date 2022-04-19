// Copyright 2019-2021, University of Colorado Boulder

/**
 * MOTHAOptionsNode is the user interface for global options, accessed via PhET > Options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type MOTHAOptionsNodeOptions = SelfOptions & Omit<VBoxOptions, 'children'>;

export default class MOTHAOptionsNode extends VBox {

  private readonly disposeMOTHAOptionsNode: () => void;

  constructor( providedOptions?: MOTHAOptionsNodeOptions ) {

    const options = optionize<MOTHAOptionsNodeOptions, SelfOptions, VBoxOptions, 'tandem'>( {

      // phet-io
      tandem: Tandem.REQUIRED //TODO replace with PickRequired
    }, providedOptions );

    // Projector Mode checkbox
    const projectorModeCheckbox = new ProjectorModeCheckbox( {
      tandem: options.tandem.createTandem( 'projectorModeCheckbox' )
    } );

    options.children = [ projectorModeCheckbox ];

    super( options );

    this.disposeMOTHAOptionsNode = () => {
      projectorModeCheckbox.dispose();
    };
  }

  public override dispose(): void {
    this.disposeMOTHAOptionsNode();
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAOptionsNode', MOTHAOptionsNode );