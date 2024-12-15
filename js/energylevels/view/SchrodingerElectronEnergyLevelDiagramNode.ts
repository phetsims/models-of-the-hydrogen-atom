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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

const LEVEL_NODE_X_OFFSET = 15;
const LEVEL_LINE_LENGTH = 15;
const LEVEL_LINE_X_SPACING = 4;
const LABEL_FONT = new PhetFont( 12 );

type SelfOptions = EmptySelfOptions;

export type SchrodingerElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class SchrodingerElectronEnergyLevelDiagramNode extends ElectronEnergyLevelDiagramNode {

  public constructor( hydrogenAtom: SchrodingerModel, providedOptions: SchrodingerElectronEnergyLevelDiagramNodeOptions ) {

    super( providedOptions );

    // n horizontal lines for each energy level, labeled with 'n = {value}'.
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const levelNode = createLevelNode( n );
      levelNode.localBoundsProperty.link( () => {
        levelNode.left = this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET;
        levelNode.centerY = this.getYOffsetForState( n );
      } );
      this.stateLayer.addChild( levelNode );
    }

    //TODO l = 0 1 2 3 4 5

    // 'm = {value}' in the upper right corner of the diagram.
    const mEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.mStringProperty,
      value: new DerivedProperty( [ hydrogenAtom.nlmProperty ], nlm => nlm.m )
    } );
    const mText = new RichText( mEqualsValueStringProperty, {
      font: LABEL_FONT,
      maxWidth: 50,
      top: this.energyAxisHBox.top
    } );
    mText.localBoundsProperty.link( () => {
      mText.right = this.rectangle.right - 10;
    } );
    this.stateLayer.addChild( mText );

    // Position the electron on the level line, based on the values of n and l.
    hydrogenAtom.nlmProperty.link( nlm => {
      this.electronNode.centerX = this.stateLayer.left + LEVEL_LINE_LENGTH / 2 + ( nlm.l * ( LEVEL_LINE_X_SPACING + LEVEL_LINE_LENGTH ) );
      this.electronNode.centerY = this.getYOffsetForState( nlm.n );
    } );

    //TODO Display squiggle between previous and current electron state.
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists n-1 horizontal lines with label "n = {value}" to the right of the lines.
 */
function createLevelNode( n: number ): Node {
  assert && assert( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.MAX_STATE );

  // Create the same number of lines for all levels, so that the "n = {n}" labels will be horizontally aligned.
  // Only the lines that are relevant will be visible.
  const lines: Node[] = [];
  for ( let l = 0; l < MOTHAConstants.MAX_STATE; l++ ) {
    const line = new Line( 0, 0, LEVEL_LINE_LENGTH, 0, {
      lineWidth: 1,
      stroke: 'black',
      visible: ( l < n )
    } );
    lines.push( line );
  }
  const linesHBox = new HBox( {
    excludeInvisibleChildrenFromBounds: false,
    children: lines,
    spacing: LEVEL_LINE_X_SPACING
  } );

  const labelStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
    symbol: MOTHASymbols.nStringProperty,
    value: n
  } );
  const label = new RichText( labelStringProperty, {
    fill: 'black',
    font: LABEL_FONT,
    maxWidth: 50
  } );

  return new HBox( {
    children: [ linesHBox, label ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerElectronEnergyLevelDiagramNode', SchrodingerElectronEnergyLevelDiagramNode );