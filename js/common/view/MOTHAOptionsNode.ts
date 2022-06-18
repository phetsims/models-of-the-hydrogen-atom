// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAOptionsNode is content for the Options dialog, accessed via PhET > Options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = EmptyObjectType;

type MOTHAOptionsNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MOTHAOptionsNode extends VBox {

  private readonly disposeMOTHAOptionsNode: () => void;

  public constructor( providedOptions?: MOTHAOptionsNodeOptions ) {

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