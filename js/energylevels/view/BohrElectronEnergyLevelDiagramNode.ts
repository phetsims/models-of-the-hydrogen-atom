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
import { HBox, Line, Node, RichText } from '../../../../scenery/js/imports.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';

const LEVEL_NODE_X_OFFSET = 15;
const LEVEL_LINE_LENGTH = 15;
const LEVEL_LABEL_FONT = new PhetFont( 12 );

type SelfOptions = EmptySelfOptions;

export type BohrElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class BohrElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: BohrModel, providedOptions: BohrElectronEnergyLevelDiagramNodeOptions ) {

    super( providedOptions );

    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const levelNode = createLevelNode( n );
      levelNode.localBoundsProperty.link( () => {
        levelNode.left = this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET;
        levelNode.centerY = this.getYOffsetForState( n );
      } );
      this.stateLayer.addChild( levelNode );
    }

    // Position electron on level line.
    this.electronNode.centerX = this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET + LEVEL_LINE_LENGTH / 2;
    hydrogenAtom.electron.nProperty.link( n => {
      this.electronNode.centerY = this.getYOffsetForState( n );
    } );

    //TODO Display squiggle between previous and current electron state.
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists of a horizontal line with label "n = {value}" to the right of the line.
 */
function createLevelNode( n: number ): Node {

  const line = new Line( 0, 0, LEVEL_LINE_LENGTH, 0, {
    lineWidth: 1,
    stroke: 'black'
  } );

  const labelStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nEqualsStringProperty, {
    nSymbol: MOTHASymbols.nStringProperty,
    nValue: n
  } );
  const label = new RichText( labelStringProperty, {
    fill: 'black',
    font: LEVEL_LABEL_FONT,
    maxWidth: 50
  } );

  return new HBox( {
    children: [ line, label ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'BohrElectronEnergyLevelDiagramNode', BohrElectronEnergyLevelDiagramNode );