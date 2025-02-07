// Copyright 2024-2025, University of Colorado Boulder

/**
 * ExperimentEnergyDiagram is the Electron Energy Level diagram for the Experiment model.
 * Since the user is supposed to guess which model corresponds to the Experiment, a '?' is shown instead of a diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';

type SelfOptions = {
  size: Dimension2;
};

type ExperimentEnergyDiagramOptions = SelfOptions & EnergyDiagramOptions;

export default class ExperimentEnergyDiagram extends EnergyDiagram {

  public constructor( providedOptions: ExperimentEnergyDiagramOptions ) {

    super( providedOptions );

    // Hide the electron, but keep the Energy axis visible.
    this.electronNode.visible = false;

    const questionMarkText = new Text( ModelsOfTheHydrogenAtomStrings.questionMarkStringProperty, {
      font: new PhetFont( 72 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 60,
      center: this.backgroundRectangle.center
    } );
    this.addChild( questionMarkText );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentEnergyDiagram', ExperimentEnergyDiagram );