// Copyright 2022-2024, University of Colorado Boulder

//TODO Lots of duplication with SpectraZoomedInBoxNode.
/**
 * EnergyLevelsZoomedInBoxNode displays what's inside the zoomed-in box for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import BohrNode from '../../common/view/BohrNode.js';
import DeBroglieNode from '../../common/view/DeBroglieNode.js';
import PhotonNode from '../../common/view/PhotonNode.js';
import SchrodingerNode from '../../common/view/SchrodingerNode.js';
import ZoomedInBoxNode, { ZoomedInBoxNodeOptions } from '../../common/view/ZoomedInBoxNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';

const VIEW_SIZE = MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE;

type SelfOptions = EmptySelfOptions;

type EnergyLevelsZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class EnergyLevelsZoomedInBoxNode extends ZoomedInBoxNode {

  private readonly deBroglieNode: DeBroglieNode;

  // For setting pdomOrder.
  public readonly deBroglieRepresentationComboBox: Node;
  public readonly schrodingerQuantumNumbersInfoButton: Node;

  public constructor( model: EnergyLevelsModel, popupParent: Node, providedOptions: EnergyLevelsZoomedInBoxNodeOptions ) {

    const options = providedOptions;

    // All model-view transform operations take place in the zoomed-in box.
    // Our model uses a right-handed coordinate system: +x right, +y up, +angle counterclockwise.
    // Our view uses a left-handed coordinate system: +x right, +y down, +angle clockwise.
    // The origin is at the center of the zoomed-in box.
    const viewOffset = new Vector2( VIEW_SIZE / 2, VIEW_SIZE );
    const xScale = VIEW_SIZE / model.zoomedInBox.width;
    const yScale = VIEW_SIZE / model.zoomedInBox.height;
    assert && assert( xScale === yScale, 'box is not scaled the same in both dimensions, is your box square?' );
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( viewOffset, xScale, -yScale );

    super( model.zoomedInBox, modelViewTransform, model.isExperimentProperty, options );

    const bohrNode = new BohrNode( model.bohrModel, model.hydrogenAtomProperty, model.zoomedInBox, modelViewTransform, {
      tandem: options.tandem.createTandem( 'bohrNode' )
    } );

    const deBroglieNode = new DeBroglieNode( model.deBroglieModel, model.hydrogenAtomProperty, model.zoomedInBox,
      modelViewTransform, popupParent, {
        tandem: options.tandem.createTandem( 'deBroglieNode' )
      } );

    const schrodingerNode = new SchrodingerNode( model.schrodingerModel, model.hydrogenAtomProperty, model.zoomedInBox,
      model.light, modelViewTransform, {
        tandem: options.tandem.createTandem( 'schrodingerNode' )
      } );

    const photonsLayer = new Node();

    this.contentsNode.addChild( new Node( {
      children: [
        bohrNode,
        deBroglieNode,
        schrodingerNode,
        photonsLayer
      ]
    } ) );

    const photonNodes: PhotonNode[] = [];

    // Add the PhotonNode for a Photon.
    model.photons.addItemAddedListener( photon => {
      const photonNode = new PhotonNode( photon, modelViewTransform );
      photonNodes.push( photonNode );
      photonsLayer.addChild( photonNode );
    } );

    // Remove the PhotonNode for a Photon.
    model.photons.addItemRemovedListener( photon => {
      const photonNode = _.find( photonNodes, photonNode => ( photonNode.photon === photon ) )!;
      assert && assert( photonNode );
      photonNodes.splice( photonNodes.indexOf( photonNode ), 1 );
      photonsLayer.removeChild( photonNode );
      photonNode.dispose();
    } );

    this.deBroglieNode = deBroglieNode;
    this.deBroglieRepresentationComboBox = deBroglieNode.deBroglieRepresentationComboBox;
    this.schrodingerQuantumNumbersInfoButton = schrodingerNode.quantumNumbersInfoButton;
  }

  public step( dt: number ): void {
    this.deBroglieNode.step( dt );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsZoomedInBoxNode', EnergyLevelsZoomedInBoxNode );