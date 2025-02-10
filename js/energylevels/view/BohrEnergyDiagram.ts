// Copyright 2024-2025, University of Colorado Boulder

/**
 * BohrEnergyDiagram is the Electron Energy Level diagram for the Bohr model.
 *
 * This was BohrEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import BohrModel from '../../common/model/BohrModel.js';
import photonAbsorptionModel from '../../common/model/PhotonAbsorptionModel.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

const LEVEL_LINE_LENGTH = EnergyDiagram.LEVEL_LINE_LENGTH;
const LABEL_FONT = EnergyDiagram.LABEL_FONT;
const LABEL_MAX_WIDTH = EnergyDiagram.LABEL_MAX_WIDTH;

type SelfOptions = EmptySelfOptions;

export type BohrEnergyDiagramOptions = SelfOptions & StrictOmit<EnergyDiagramOptions, 'createLevelNode'>;

export default class BohrEnergyDiagram extends EnergyDiagram {

  public constructor( bohrModel: BohrModel, providedOptions: BohrEnergyDiagramOptions ) {

    const options = optionize<BohrEnergyDiagramOptions, SelfOptions, EnergyDiagramOptions>()( {

      // EnergyDiagramOptions
      createLevelNode: n => createLevelNode( n )
    }, providedOptions );

    super( options );

    // Position the electron on a level line, based on the value of n.
    bohrModel.electron.nProperty.link( ( nNew, nOld ) => {

      // Previous electron position.
      const xPrevious = this.electronNode.centerX;
      const yPrevious = this.electronNode.bottom;

      // New electron position.
      const x = this.stateLayer.left + LEVEL_LINE_LENGTH / 2;
      const y = this.getYForState( nNew );

      // Move electron to new level line.
      this.electronNode.centerX = x;
      this.electronNode.bottom = y;

      // Draw squiggle between previous and current electron state.
      if ( nOld !== null ) {
        this.setEnergySquiggle( xPrevious, yPrevious, x, y, photonAbsorptionModel.getTransitionWavelength( nOld, nNew ) );
      }
    } );
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists of a horizontal line with label "n = {value}" to the right of the line.
 */
function createLevelNode( n: number ): Node {

  const line = new Line( 0, 0, LEVEL_LINE_LENGTH, 0, {
    lineWidth: 1,
    stroke: MOTHAColors.invertibleTextFillProperty
  } );

  const nEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
    symbol: MOTHASymbols.nStringProperty,
    value: n
  } );
  const nEqualsValueText = new RichText( nEqualsValueStringProperty, {
    fill: MOTHAColors.invertibleTextFillProperty,
    font: LABEL_FONT,
    maxWidth: LABEL_MAX_WIDTH
  } );

  return new HBox( {
    children: [ line, nEqualsValueText ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'BohrEnergyDiagram', BohrEnergyDiagram );