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
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import { HBox, Line, Node, RichText } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';

const LEVEL_NODE_X_OFFSET = 15;
const LEVEL_LINE_LENGTH = 15;
const LEVEL_LINE_X_SPACING = 4;
const LEVEL_LABEL_FONT = new PhetFont( 12 );

type SelfOptions = EmptySelfOptions;

export type SchrodingerElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class SchrodingerElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: SchrodingerModel, providedOptions: SchrodingerElectronEnergyLevelDiagramNodeOptions ) {

    super( providedOptions );

    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const levelNode = createLevelNode( n );
      levelNode.localBoundsProperty.link( () => {
        levelNode.left = this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET;
        levelNode.centerY = this.getYOffsetForState( n );
      } );
      this.stateLayer.addChild( levelNode );
    }

    //TODO Position electron on level line.

    //TODO Display squiggle between previous and current electron state.
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists n-1 horizontal lines with label "n = {value}" to the right of the lines.
 */
function createLevelNode( n: number ): Node {

  const linesLength = n * LEVEL_LINE_LENGTH + ( n - 1 ) * LEVEL_LINE_X_SPACING;
  const lines = new Line( 0, 0, linesLength, 0, {
    lineWidth: 1,
    lineDash: [ LEVEL_LINE_LENGTH, LEVEL_LINE_X_SPACING ],
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
    children: [ lines, label ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerElectronEnergyLevelDiagramNode', SchrodingerElectronEnergyLevelDiagramNode );