// Copyright 2024, University of Colorado Boulder

/**
 * ExperimentElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the Experiment model.
 * Since the user is supposed to guess which model corresponds to the Experiment, a '?' is shown instead of a diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ElectronEnergyLevelDiagramNode, { ElectronEnergyLevelDiagramNodeOptions } from './ElectronEnergyLevelDiagramNode.js';

type SelfOptions = {
  size: Dimension2;
};

type ExperimentElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class ExperimentElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( providedOptions: ExperimentElectronEnergyLevelDiagramNodeOptions ) {

    super( providedOptions );

    // Hide the electron, but keep the Energy axis visible.
    this.electronNode.visible = false;

    const questionMarkText = new Text( ModelsOfTheHydrogenAtomStrings.questionMarkStringProperty, {
      font: new PhetFont( 72 ),
      fill: 'black',
      maxWidth: 60,
      center: this.rectangle.center
    } );
    this.addChild( questionMarkText );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentElectronEnergyLevelDiagramNode', ExperimentElectronEnergyLevelDiagramNode );