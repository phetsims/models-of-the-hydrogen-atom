// Copyright 2022, University of Colorado Boulder

/**
 * BohrNode shows the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ElectronNode from './ElectronNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import BohrModel from '../model/BohrModel.js';
import PrimaryElectronStateText from './PrimaryElectronStateText.js';
import MOTHAConstants from '../MOTHAConstants.js';
import OrbitsNode from './OrbitsNode.js';

type SelfOptions = EmptySelfOptions;

type BohrNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class BohrNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BohrModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: BohrNodeOptions ) {

    const options = optionize<BohrNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      // No default values, but we modify options below.
    }, providedOptions );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform, {
      tandem: options.tandem.createTandem( 'electronNode' )
    } );

    const electronStateText = new PrimaryElectronStateText( hydrogenAtom.getElectronStateProperty(), {
      tandem: options.tandem.createTandem( 'electronStateText' )
    } );

    options.children = [ orbitsNode, protonNode, electronNode, electronStateText ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );
    electronStateText.boundsProperty.link( bounds => {
      electronStateText.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'BohrNode', BohrNode );