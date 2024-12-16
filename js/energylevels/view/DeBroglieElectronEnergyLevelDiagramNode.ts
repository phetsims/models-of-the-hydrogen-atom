// Copyright 2024, University of Colorado Boulder

/**
 * DeBroglieElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the de Broglie model.
 * This is identical to the diagram for Bohr model, and adds no new functionality. A class is provided for
 * completeness of the class hierarchy.
 *
 * This was DeBroglieEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import BohrElectronEnergyLevelDiagramNode, { BohrElectronEnergyLevelDiagramNodeOptions } from './BohrElectronEnergyLevelDiagramNode.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieElectronEnergyLevelDiagramNodeOptions = SelfOptions & BohrElectronEnergyLevelDiagramNodeOptions;

export default class DeBroglieElectronEnergyLevelDiagramNode extends BohrElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: DeBroglieModel, providedOptions: DeBroglieElectronEnergyLevelDiagramNodeOptions ) {
    super( hydrogenAtom, providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieElectronEnergyLevelDiagramNode', DeBroglieElectronEnergyLevelDiagramNode );