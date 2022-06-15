// Copyright 2022, University of Colorado Boulder

/**
 * BohrNode shows the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import ElectronNode from './ElectronNode.js';
import OrbitNode from './OrbitNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import BohrModel from '../model/BohrModel.js';
import { Node } from '../../../../scenery/js/imports.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import MOTHAColors from '../MOTHAColors.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

// margin between the state display and zoomed-in box
const STATE_DISPLAY_MARGIN = 15;

type SelfOptions = EmptyObjectType;

type BohrNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class BohrNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BohrModel, hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox, modelViewTransform: ModelViewTransform2,
                      providedOptions: BohrNodeOptions ) {

    const options = optionize<BohrNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO
    }, providedOptions );

    // Orbits
    const orbitCenter = modelViewTransform.modelToViewPosition( hydrogenAtom.position );
    const orbitNodes = [];
    const groundState = HydrogenAtom.GROUND_STATE;
    const numberOfStates = BohrModel.getNumberOfStates();
    for ( let state = groundState; state < ( groundState + numberOfStates ); state++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( BohrModel.getOrbitRadius( state ) );
      const orbitNode = new OrbitNode( radius, {
        center: orbitCenter,
        tandem: options.tandem.createTandem( `orbit${state}Node` )
      } );
      orbitNodes.push( orbitNode );
    }
    const orbitsParent = new Node( {
      children: orbitNodes
    } );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform, {
      tandem: options.tandem.createTandem( 'electronNode' )
    } );

    assert && assert( hydrogenAtom.electronStateProperty.range );
    const stateDisplayNode = new NumberDisplay( hydrogenAtom.electronStateProperty, hydrogenAtom.electronStateProperty.range!, {
      valuePattern: 'n = {{value}}',
      textOptions: {
        font: new PhetFont( 16 ),
        fill: MOTHAColors.stateDisplayFillProperty
      },
      backgroundFill: null,
      backgroundStroke: null
    } );

    // Keep the state display positions in the lower-right corner.
    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );
    stateDisplayNode.boundsProperty.link( bounds => {
      stateDisplayNode.right = zoomedInBoxBounds.right - STATE_DISPLAY_MARGIN;
      stateDisplayNode.bottom = zoomedInBoxBounds.bottom - STATE_DISPLAY_MARGIN;
    } );

    options.children = [ orbitsParent, protonNode, electronNode, stateDisplayNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrNode', BohrNode );