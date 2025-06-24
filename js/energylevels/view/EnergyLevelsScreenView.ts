// Copyright 2016-2025, University of Colorado Boulder

/**
 * EnergyLevelsScreenView is the view for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAScreenView from '../../common/view/MOTHAScreenView.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import ElectronEnergyLevelAccordionBox from './ElectronEnergyLevelAccordionBox.js';
import EnergyLevelsZoomedInBoxNode from './EnergyLevelsZoomedInBoxNode.js';
import EnergyLevelsScreenSummaryContent from './EnergyLevelsScreenSummaryContent.js';

export default class EnergyLevelsScreenView extends MOTHAScreenView {

  public constructor( model: EnergyLevelsModel, tandem: Tandem ) {

    // Parent for any popups.
    const popupsParent = new Node();

    // The zoomed-in view of the box of hydrogen.
    const zoomedInBoxNode = new EnergyLevelsZoomedInBoxNode( model, popupsParent, tandem.createTandem( 'zoomedInBoxNode' ) );

    // Accordion box that shows Electron Energy Level diagrams.
    const electronEnergyLevelAccordionBox = new ElectronEnergyLevelAccordionBox( model,
      tandem.createTandem( 'electronEnergyLevelAccordionBox' ) );

    super( model, {
      popupsParent: popupsParent,
      zoomedInBoxNode: zoomedInBoxNode,
      electronEnergyLevelAccordionBox: electronEnergyLevelAccordionBox,
      lightSourceNodeXOffset: 35,
      atomicModelRadioButtonTextMaxWidth: 120,
      hasContinuumBarNode: false,
      screenSummaryContent: new EnergyLevelsScreenSummaryContent(),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenView', EnergyLevelsScreenView );