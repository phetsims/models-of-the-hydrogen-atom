// Copyright 2024, University of Colorado Boulder

/**
 * ExperimentElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the Experiment model.
 * Since the user is supposed to guess which model corresponds to the Experiment, a '?' is shown instead of a diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';

type SelfOptions = {
  size: Dimension2;
};

type ExperimentElectronEnergyLevelDiagramNodeOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty'>;

export default class ExperimentElectronEnergyLevelDiagramNode extends Node {

  public constructor( providedOptions: ExperimentElectronEnergyLevelDiagramNodeOptions ) {

    const rectangle = new Rectangle( 0, 0, providedOptions.size.width, providedOptions.size.height, {
      fill: 'white',
      stroke: 'black'
    } );

    const questionMarkText = new Text( ModelsOfTheHydrogenAtomStrings.questionMarkStringProperty, {
      font: new PhetFont( 72 ),
      fill: 'black',
      maxWidth: 60,
      center: rectangle.center
    } );

    const options = optionize<ExperimentElectronEnergyLevelDiagramNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,
      children: [ rectangle, questionMarkText ]
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentElectronEnergyLevelDiagramNode', ExperimentElectronEnergyLevelDiagramNode );