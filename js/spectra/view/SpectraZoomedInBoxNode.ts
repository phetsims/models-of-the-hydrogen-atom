// Copyright 2022, University of Colorado Boulder

/**
 * SpectraZoomedInBoxNode shows what's inside the zoomed-in box for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import ZoomedInBoxNode, { ZoomedInBoxNodeOptions } from '../../common/view/ZoomedInBoxNode.js';
import PlumPuddingNode from '../../common/view/PlumPuddingNode.js';
import BilliardBallNode from '../../common/view/BilliardBallNode.js';
import PhotonNode from '../../common/view/PhotonNode.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';

const VIEW_BOX_SIZE = new Dimension2( 400, 400 );

type SelfOptions = {};

type SpectraZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class SpectraZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: SpectraModel, providedOptions: SpectraZoomedInBoxNodeOptions ) {

    const options = optionize<SpectraZoomedInBoxNodeOptions, SelfOptions, ZoomedInBoxNodeOptions>()( {
      //TODO
    }, providedOptions );

    // All of the model-view transform action takes place in the zoomed-in box.
    // Our model uses a right-handed coordinate system: +x right, +y up, +angle counterclockwise.
    // Our view uses a left-handed coordinate system: +x right, +y down, +angle clockwise.
    // The origin is at the center of the zoomed-in box.
    const viewOffset = new Vector2( VIEW_BOX_SIZE.width / 2, VIEW_BOX_SIZE.height );
    const xScale = VIEW_BOX_SIZE.width / model.zoomedInBox.width;
    const yScale = VIEW_BOX_SIZE.height / model.zoomedInBox.height;
    assert && assert( xScale === yScale, 'box is not scaled the same in both dimensions, is your box square?' );
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( viewOffset, xScale, -yScale );

    super( model.zoomedInBox, modelViewTransform, options );

    const billiardBallNode = new BilliardBallNode( model.billiardBallModel, model.hydrogenAtomProperty, modelViewTransform, {
      tandem: options.tandem.createTandem( 'billiardBallNode' )
    } );
    this.addChild( billiardBallNode );

    const plumPuddingNode = new PlumPuddingNode( model.plumPuddingModel, model.hydrogenAtomProperty, modelViewTransform, {
      tandem: options.tandem.createTandem( 'plumPuddingNode' )
    } );
    this.addChild( plumPuddingNode );

    const photonNodes: PhotonNode[] = [];

    // Add the PhotonNode for a Photon.
    model.photons.addItemAddedListener( photon => {
      const photonNode = new PhotonNode( photon, modelViewTransform );
      photonNodes.push( photonNode );
      this.addChild( photonNode );
    } );

    // Remove the PhotonNode for a Photon.
    model.photons.addItemRemovedListener( photon => {
      const photonNode = _.find( photonNodes, photonNode => ( photonNode.photon === photon ) )!;
      assert && assert( photonNode );
      photonNodes.splice( photonNodes.indexOf( photonNode ), 1 );
      this.removeChild( photonNode );
      photonNode.dispose();
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );