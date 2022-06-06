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

type SelfOptions = {};

type SpectraZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class SpectraZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: SpectraModel, modelViewTransform: ModelViewTransform2, providedOptions: SpectraZoomedInBoxNodeOptions ) {

    const options = optionize<SpectraZoomedInBoxNodeOptions, SelfOptions, ZoomedInBoxNodeOptions>()( {
      //TODO
    }, providedOptions );

    super( model.zoomedInBox, modelViewTransform, options );

    const billiardBallNode = new BilliardBallNode( model.billiardBallModel, model.hydrogenAtomProperty, modelViewTransform, {
      tandem: options.tandem.createTandem( 'billiardBallNode' )
    } );
    this.addChild( billiardBallNode );

    const plumPuddingNode = new PlumPuddingNode( model.plumPuddingModel, model.hydrogenAtomProperty, modelViewTransform, {
      tandem: options.tandem.createTandem( 'plumPuddingNode' )
    } );
    this.addChild( plumPuddingNode );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );