// Copyright 2024, University of Colorado Boulder

/**
 * BohrElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the Bohr model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ElectronEnergyLevelDiagramNode, { ElectronEnergyLevelDiagramNodeOptions } from './ElectronEnergyLevelDiagramNode.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BohrModel from '../../common/model/BohrModel.js';

type SelfOptions = EmptySelfOptions;

export type BohrElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class BohrElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: BohrModel, providedOptions: BohrElectronEnergyLevelDiagramNodeOptions ) {

    //TODO Implement diagram for Bohr.

    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrElectronEnergyLevelDiagramNode', BohrElectronEnergyLevelDiagramNode );