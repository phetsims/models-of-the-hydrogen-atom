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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {};

type SpectraZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class SpectraZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: SpectraModel, modelViewTransform: ModelViewTransform2, providedOptions: SpectraZoomedInBoxNodeOptions ) {

    const options = optionize<SpectraZoomedInBoxNodeOptions, SelfOptions, ZoomedInBoxNodeOptions>()( {
      //TODO
    }, providedOptions );

    super( model.zoomedInBox, modelViewTransform, options );

    const plumPuddingNode = new PlumPuddingNode( model.plumPuddingModel, modelViewTransform, {
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ],
        hydrogenAtom => ( hydrogenAtom === model.plumPuddingModel ) ),
      tandem: options.tandem.createTandem( 'plumPuddingNode' )
    } );
    this.addChild( plumPuddingNode );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );