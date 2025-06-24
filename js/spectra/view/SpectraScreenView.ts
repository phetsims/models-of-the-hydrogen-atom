// Copyright 2015-2025, University of Colorado Boulder

/**
 * SpectraScreenView is the view for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAScreenView from '../../common/view/MOTHAScreenView.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SpectraModel from '../model/SpectraModel.js';
import SpectraZoomedInBoxNode from './SpectraZoomedInBoxNode.js';

export default class SpectraScreenView extends MOTHAScreenView {

  public constructor( model: SpectraModel, tandem: Tandem ) {

    // Parent for any popups.
    const popupsParent = new Node();

    // The zoomed-in view of the box of hydrogen.
    const zoomedInBoxNode = new SpectraZoomedInBoxNode( model, popupsParent, tandem.createTandem( 'zoomedInBoxNode' ) );

    super( model, {
      popupsParent: popupsParent,
      zoomedInBoxNode: zoomedInBoxNode,
      lightSourceNodeXOffset: 125,
      atomicModelRadioButtonTextMaxWidth: 200,
      screenSummaryContent: new ScreenSummaryContent( {
        playAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.playAreaStringProperty,
        controlAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.controlAreaStringProperty,
        interactionHintContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.interactionHintStringProperty
      } ),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreenView', SpectraScreenView );