// Copyright 2015-2025, University of Colorado Boulder

/**
 * ZoomedInBoxNode is a base class that provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms and photons takes place.
 * Subclasses are expected to add views of specific hydrogen-atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAColors from '../MOTHAColors.js';
import ExperimentNode from './ExperimentNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MOTHAConstants from '../MOTHAConstants.js';
import PhotonNode from './PhotonNode.js';
import PhotonPool from '../model/PhotonPool.js';

const VIEW_SIZE = MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE;

export default class ZoomedInBoxNode extends Node {

  private readonly hydrogenAtomNodes: HydrogenAtomNode[];

  protected constructor( zoomedInBox: ZoomedInBox,
                         photonPool: PhotonPool,
                         createHydrogenAtomNodes: ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => HydrogenAtomNode[],
                         createOverlayNodes: ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => Node[],
                         isExperimentProperty: TReadOnlyProperty<boolean>,
                         tandem: Tandem ) {

    // All model-view transform operations take place in the zoomed-in box, whose origin is at its center.
    // The model uses a right-handed coordinate system: +x right, +y up, +angle counterclockwise.
    // The view uses a left-handed coordinate system: +x right, +y down, +angle clockwise.
    const viewOffset = new Vector2( VIEW_SIZE / 2, VIEW_SIZE );
    const xScale = VIEW_SIZE / zoomedInBox.width;
    const yScale = VIEW_SIZE / zoomedInBox.height;
    assert && assert( xScale === yScale, 'box is not scaled the same in both dimensions, is your box square?' );
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( viewOffset, xScale, -yScale );

    const hydrogenAtomNodes = createHydrogenAtomNodes( modelViewTransform, tandem );

    const overlayNodes = createOverlayNodes( modelViewTransform, tandem );

    const photonsLayer = new Node();

    const backgroundNode = new Rectangle( modelViewTransform.modelToViewBounds( zoomedInBox ), {
      fill: MOTHAColors.zoomedInBoxFillProperty
    } );

    const outlineNode = new Rectangle( modelViewTransform.modelToViewBounds( zoomedInBox ), {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineWidth: 3
    } );

    const experimentNode = new ExperimentNode( isExperimentProperty, {
      center: backgroundNode.center
    } );

    // Contents of the box, clipped to the bounds of the box.
    const contentsLayer = new Node( {
      children: [ ...hydrogenAtomNodes, photonsLayer, ...overlayNodes, experimentNode ],
      clipArea: modelViewTransform.modelToViewShape( Shape.rectangle( zoomedInBox.minX, zoomedInBox.minY, zoomedInBox.width, zoomedInBox.height ) )
    } );

    super( {
      isDisposable: false,
      children: [ backgroundNode, contentsLayer, outlineNode ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );

    this.hydrogenAtomNodes = hydrogenAtomNodes;

    const photonNodes: PhotonNode[] = [];

    // Add the PhotonNode for a Photon.
    photonPool.addPhotonAddedListener( photon => {
      const photonNode = new PhotonNode( photon, modelViewTransform );
      photonNodes.push( photonNode );
      photonsLayer.addChild( photonNode );
    } );

    // Remove the PhotonNode for a Photon.
    photonPool.addPhotonRemovedListener( photon => {
      const photonNode = _.find( photonNodes, photonNode => ( photonNode.photon === photon ) )!;
      assert && assert( photonNode );
      photonNodes.splice( photonNodes.indexOf( photonNode ), 1 );
      photonsLayer.removeChild( photonNode );
      photonNode.dispose();
    } );
  }

  public step( dt: number ): void {
    this.hydrogenAtomNodes.forEach( hydrogenAtomNode => hydrogenAtomNode.step( dt ) );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBoxNode', ZoomedInBoxNode );