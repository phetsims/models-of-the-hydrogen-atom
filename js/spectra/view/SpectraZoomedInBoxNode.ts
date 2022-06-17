// Copyright 2022, University of Colorado Boulder

/**
 * SpectraZoomedInBoxNode shows what's inside the zoomed-in box for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import ZoomedInBoxNode, { ZoomedInBoxNodeOptions } from '../../common/view/ZoomedInBoxNode.js';
import PlumPuddingNode from '../../common/view/PlumPuddingNode.js';
import BilliardBallNode from '../../common/view/BilliardBallNode.js';
import PhotonNode from '../../common/view/PhotonNode.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ClassicalSolarSystemNode from '../../common/view/ClassicalSolarSystemNode.js';
import BohrNode from '../../common/view/BohrNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';

const VIEW_SIZE = MOTHAConstants.ZOOM_IN_BOX_VIEW_SIZE;

type SelfOptions = EmptyObjectType;

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
    const viewOffset = new Vector2( VIEW_SIZE / 2, VIEW_SIZE );
    const xScale = VIEW_SIZE / model.zoomedInBox.width;
    const yScale = VIEW_SIZE / model.zoomedInBox.height;
    assert && assert( xScale === yScale, 'box is not scaled the same in both dimensions, is your box square?' );
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( viewOffset, xScale, -yScale );

    super( model.zoomedInBox, modelViewTransform, options );

    this.contentsNode.addChild( new Node( {
      children: [
        new BilliardBallNode( model.billiardBallModel, model.hydrogenAtomProperty, modelViewTransform, {
          tandem: options.tandem.createTandem( 'billiardBallNode' )
        } ),
        new PlumPuddingNode( model.plumPuddingModel, model.hydrogenAtomProperty, modelViewTransform, {
          tandem: options.tandem.createTandem( 'plumPuddingNode' )
        } ),
        new ClassicalSolarSystemNode( model.classicalSolarSystemModel, model.hydrogenAtomProperty, modelViewTransform, {
          tandem: options.tandem.createTandem( 'classicalSolarSystemNode' )
        } ),
        new BohrNode( model.bohrModel, model.hydrogenAtomProperty, modelViewTransform, {
          tandem: options.tandem.createTandem( 'bohrNode' )
        } )
      ]
    } ) );

    const photonNodes: PhotonNode[] = [];

    // Add the PhotonNode for a Photon.
    model.photons.addItemAddedListener( photon => {
      const photonNode = new PhotonNode( photon, modelViewTransform );
      photonNodes.push( photonNode );
      this.contentsNode.addChild( photonNode );
    } );

    // Remove the PhotonNode for a Photon.
    model.photons.addItemRemovedListener( photon => {
      const photonNode = _.find( photonNodes, photonNode => ( photonNode.photon === photon ) )!;
      assert && assert( photonNode );
      photonNodes.splice( photonNodes.indexOf( photonNode ), 1 );
      this.contentsNode.removeChild( photonNode );
      photonNode.dispose();
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );