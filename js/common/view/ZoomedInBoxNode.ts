// Copyright 2015-2025, University of Colorado Boulder

/**
 * ZoomedInBoxNode is a base class that provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms and photons takes place.
 * Subclasses are expected to add views of specific hydrogen-atom models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAModel from '../model/MOTHAModel.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAColors from '../MOTHAColors.js';
import ExperimentNode from './ExperimentNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import PhotonNode from './PhotonNode.js';

export default class ZoomedInBoxNode extends Node {

  // Length of one side of the box, which is square, in view coordinates. This value is smaller than in the Java
  // version, because we are cramming more into the user interface. This value also differs from the model value
  // (ZoomedInBox.SIDE_LENGTH), so a model-view transform will be needed for things that are displayed in the box.
  public static readonly SIDE_LENGTH = 400;

  private readonly hydrogenAtomNodes: HydrogenAtomNode[];

  protected constructor( model: MOTHAModel,
                         createHydrogenAtomNodes: ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => HydrogenAtomNode[],
                         createOverlayNodes: ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => Node[],
                         tandem: Tandem ) {

    const zoomedInBox = model.zoomedInBox;

    // All model-view transform operations take place in the zoomed-in box, whose origin is at its center.
    // The model uses a right-handed coordinate system: +x right, +y up, +angle counterclockwise.
    // The view uses a left-handed coordinate system: +x right, +y down, +angle clockwise.
    const viewOffset = new Vector2( ZoomedInBoxNode.SIDE_LENGTH / 2, ZoomedInBoxNode.SIDE_LENGTH );
    const modelViewTransformScale = ZoomedInBoxNode.SIDE_LENGTH / ZoomedInBox.SIDE_LENGTH;
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( viewOffset, modelViewTransformScale, -modelViewTransformScale );

    const hydrogenAtomNodes = createHydrogenAtomNodes( modelViewTransform, tandem );

    const overlayNodes = createOverlayNodes( modelViewTransform, tandem );

    const photonsLayer = new Node();

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox.bounds );

    const backgroundNode = new Rectangle( zoomedInBoxBounds, {
      fill: MOTHAColors.zoomedInBoxFillProperty
    } );

    const outlineNode = new Rectangle( zoomedInBoxBounds, {
      stroke: MOTHAColors.zoomedInBoxStrokeProperty,
      lineWidth: 3
    } );

    const experimentNode = new ExperimentNode( model.modelOrExperimentProperty, model.experiment.nlmProperty, {
      center: backgroundNode.center
    } );

    // Contents of the box, clipped to the bounds of the box.
    const contentsLayer = new Node( {
      children: [ ...hydrogenAtomNodes, photonsLayer, ...overlayNodes, experimentNode ],
      clipArea: Shape.bounds( zoomedInBoxBounds )
    } );

    super( {
      isDisposable: false,
      children: [ backgroundNode, contentsLayer, outlineNode ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );

    this.hydrogenAtomNodes = hydrogenAtomNodes;

    const photonNodes: PhotonNode[] = [];

    // Add the PhotonNode associated with a Photon.
    model.photonGroup.elementCreatedEmitter.addListener( photon => {
      const photonNode = new PhotonNode( photon, modelViewTransform );
      photonNodes.push( photonNode );
      photonsLayer.addChild( photonNode );
    } );

    // Remove the PhotonNode associated with a Photon.
    model.photonGroup.elementDisposedEmitter.addListener( photon => {
      const photonNode = _.find( photonNodes, photonNode => ( photonNode.photon === photon ) )!;
      assert && assert( photonNode );
      photonNodes.splice( photonNodes.indexOf( photonNode ), 1 );
      photonsLayer.removeChild( photonNode );
      photonNode.dispose();
    } );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    this.hydrogenAtomNodes.forEach( hydrogenAtomNode => hydrogenAtomNode.step( dt ) );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBoxNode', ZoomedInBoxNode );