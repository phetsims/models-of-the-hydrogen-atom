// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerElectronEnergyLevelDiagramNode is the Electron Energy Level diagram for the Schrodinger model.
 *
 * This was SchrodingerEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergylDiagram, { ElectronEnergyLevelDiagramNodeOptions } from './EnergylDiagram.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import { HBox, Line, Node, RichText, Text } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

const LEVEL_NODE_X_OFFSET = EnergylDiagram.LEVEL_NODE_X_OFFSET;
const LEVEL_LINE_LENGTH = EnergylDiagram.LEVEL_LINE_LENGTH;
const LEVEL_LINE_X_SPACING = 4;
const LABEL_FONT = EnergylDiagram.LABEL_FONT;
const LABEL_MAX_WIDTH = EnergylDiagram.LABEL_MAX_WIDTH;

type SelfOptions = EmptySelfOptions;

export type SchrodingerElectronEnergyLevelDiagramNodeOptions = SelfOptions & ElectronEnergyLevelDiagramNodeOptions;

export default class SchrodingerElectronEnergyLevelDiagramNode extends EnergylDiagram {

  private readonly levelNodes: Node;

  public constructor( hydrogenAtom: SchrodingerModel, providedOptions: SchrodingerElectronEnergyLevelDiagramNodeOptions ) {

    super( providedOptions );

    // n horizontal lines for each energy level, labeled with 'n = {value}'.
    this.levelNodes = new Node();
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const levelNode = createLevelNode( n );
      levelNode.localBoundsProperty.link( () => {
        levelNode.left = this.energyAxisHBox.right + LEVEL_NODE_X_OFFSET;
        levelNode.centerY = this.getYForState( n );
      } );
      this.levelNodes.addChild( levelNode );
    }
    this.stateLayer.addChild( this.levelNodes );

    // l =
    const lEqualsStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsStringProperty, {
      symbol: MOTHASymbols.lStringProperty
    } );
    const lEqualsText = new RichText( lEqualsStringProperty, {
      font: LABEL_FONT,
      maxWidth: 14,
      right: this.levelNodes.left - 3,
      bottom: this.levelNodes.top - 1
    } );
    this.stateLayer.addChild( lEqualsText );

    // l values, centered above each level line
    for ( let l = 0; l < MOTHAConstants.MAX_STATE; l++ ) {
      const lText = new Text( l, {
        font: LABEL_FONT,
        maxWidth: 8,
        centerX: this.getXForState( l ),
        bottom: lEqualsText.bottom
      } );
      this.stateLayer.addChild( lText );
    }

    // 'm = {value}' in the upper right corner of the diagram.
    const mEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.mStringProperty,
      value: new DerivedProperty( [ hydrogenAtom.nlmProperty ], nlm => nlm.m )
    } );
    const mEqualsValueText = new RichText( mEqualsValueStringProperty, {
      font: LABEL_FONT,
      maxWidth: LABEL_MAX_WIDTH,
      top: this.energyAxisHBox.top
    } );
    mEqualsValueText.localBoundsProperty.link( () => {
      mEqualsValueText.right = this.rectangle.right - 10;
    } );
    this.stateLayer.addChild( mEqualsValueText );

    // Position the electron on the level line, based on the values of n and l.
    hydrogenAtom.nlmProperty.link( nlm => {
      this.electronNode.centerX = this.getXForState( nlm.l );
      this.electronNode.centerY = this.getYForState( nlm.n );
    } );

    //TODO Display squiggle between previous and current electron state.
  }

  /**
   * Gets the x-coordinate, relative to this Node, that corresponds to the quantum number l that describes
   * the electron's state.
   */
  private getXForState( l: number ): number {
    assert && assert( l >= 0 && l < MOTHAConstants.MAX_STATE );
    return this.levelNodes.left + LEVEL_LINE_LENGTH / 2 + ( l * ( LEVEL_LINE_LENGTH + LEVEL_LINE_X_SPACING ) );
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

  const nEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
    symbol: MOTHASymbols.nStringProperty,
    value: n
  } );
  const nEqualsValueText = new RichText( nEqualsValueStringProperty, {
    fill: 'black',
    font: LABEL_FONT,
    maxWidth: LABEL_MAX_WIDTH
  } );

  return new HBox( {
    children: [ linesHBox, nEqualsValueText ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerElectronEnergyLevelDiagramNode', SchrodingerElectronEnergyLevelDiagramNode );