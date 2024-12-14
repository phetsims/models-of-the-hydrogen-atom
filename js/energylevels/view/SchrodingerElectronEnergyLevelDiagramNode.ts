// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ElectronEnergyLevelDiagramNode, { ElectronEnergyLevelDiagramNodeOptions } from './ElectronEnergyLevelDiagramNode.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';

type SelfOptions = EmptySelfOptions;

export type SchrodingerElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class SchrodingerElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: SchrodingerModel, providedOptions: SchrodingerElectronEnergyLevelDiagramNodeOptions ) {

    //TODO Implement diagram for Schrodinger.

    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerElectronEnergyLevelDiagramNode', SchrodingerElectronEnergyLevelDiagramNode );