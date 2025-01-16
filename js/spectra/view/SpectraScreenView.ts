// Copyright 2015-2025, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';
import MOTHAScreenView from '../../common/view/MOTHAScreenView.js';

export default class SpectraScreenView extends MOTHAScreenView {

  public constructor( model: SpectraModel, tandem: Tandem ) {

    // Parent for any popups.
    const popupsParent = new Node();

    // The zoomed-in view of the box of hydrogen
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, tandem.createTandem( 'zoomedInBoxNode' ) );

    super( model, {
      popupsParent: popupsParent,
      zoomedInBoxNode: zoomedInBoxNode,
      lightNodeXOffset: 125,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );