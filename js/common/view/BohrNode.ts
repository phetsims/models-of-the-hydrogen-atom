// Copyright 2022-2024, University of Colorado Boulder

/**
 * BohrNode displays the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ElectronNode from './ElectronNode.js';
import ElectronStateText from './ElectronStateText.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import OrbitNode from './OrbitNode.js';
import OrbitsNode from './OrbitsNode.js';
import ProtonNode from './ProtonNode.js';

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
    const orbitsNode = new OrbitsNode( hydrogenAtom.position, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform );

    //TODO Should electronStateText be in front of photons?
    const electronStateText = new ElectronStateText( hydrogenAtom.electron.nProperty, {
      tandem: options.tandem.createTandem( 'electronStateText' )
    } );

    options.children = [ orbitsNode, protonNode, electronNode, electronStateText ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );
  }

  public static createIcon(): Node {
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new OrbitNode( orbitRadius );
    const electronIcon = ElectronNode.createIcon();
    electronIcon.setScaleMagnitude( 0.5 );
    const electronAngle = 1.25 * Math.PI;
    electronIcon.centerX = orbitRadius * Math.sin( electronAngle );
    electronIcon.centerY = orbitRadius * Math.cos( electronAngle );
    return new Node( {
      children: [ orbitNode, protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrNode', BohrNode );