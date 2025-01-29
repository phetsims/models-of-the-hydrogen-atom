// Copyright 2024-2025, University of Colorado Boulder

/**
 * BohrEnergyDiagram is the Electron Energy Level diagram for the Bohr model.
 *
 * This was BohrEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BohrModel from '../../common/model/BohrModel.js';
import { HBox, Line, Node, RichText } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import photonAbsorptionModel from '../../common/model/PhotonAbsorptionModel.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import Vector2 from '../../../../dot/js/Vector2.js';

const LEVEL_NODE_X_OFFSET = EnergyDiagram.LEVEL_NODE_X_OFFSET;
const LEVEL_LINE_LENGTH = EnergyDiagram.LEVEL_LINE_LENGTH;
const LABEL_FONT = EnergyDiagram.LABEL_FONT;
const LABEL_MAX_WIDTH = EnergyDiagram.LABEL_MAX_WIDTH;

type SelfOptions = EmptySelfOptions;

export type BohrEnergyDiagramOptions = SelfOptions & EnergyDiagramOptions;

export default class BohrEnergyDiagram extends EnergyDiagram {

  public constructor( bohrModel: BohrModel, providedOptions: BohrEnergyDiagramOptions ) {

    super( providedOptions );

    // A horizontal line for each energy level, labeled with 'n = {value}'.
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const levelNode = createLevelNode( n );
      const levelNodeLeftCenter = new Vector2( this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET, this.getYForState( n ) );
      levelNode.localBoundsProperty.link( () => {
        levelNode.leftCenter = levelNodeLeftCenter;
      } );
      this.stateLayer.addChild( levelNode );
    }

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