// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAOptionsNode is the user interface for global options, accessed via PhET > Options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type MOTHAOptionsNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MOTHAOptionsNode extends VBox {

  private readonly disposeMOTHAOptionsNode: () => void;

  constructor( providedOptions?: MOTHAOptionsNodeOptions ) {

    const options = optionize<MOTHAOptionsNodeOptions, SelfOptions, VBoxOptions>()( {
      //TODO
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