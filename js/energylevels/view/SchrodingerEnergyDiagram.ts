// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerEnergyDiagram is the Electron Energy Level diagram for the Schrodinger model.
 *
 * This was SchrodingerEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import { HBox, Line, Node, RichText, Text } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import photonAbsorptionModel from '../../common/model/PhotonAbsorptionModel.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

const LEVEL_NODE_X_OFFSET = EnergyDiagram.LEVEL_NODE_X_OFFSET;
const LEVEL_LINE_LENGTH = EnergyDiagram.LEVEL_LINE_LENGTH;
const LEVEL_LINE_X_SPACING = 4;
const LABEL_FONT = EnergyDiagram.LABEL_FONT;
const LABEL_MAX_WIDTH = EnergyDiagram.LABEL_MAX_WIDTH;

type SelfOptions = EmptySelfOptions;

type SchrodingerEnergyDiagramOptions = SelfOptions & EnergyDiagramOptions;

export default class SchrodingerEnergyDiagram extends EnergyDiagram {

  private readonly levelNodes: Node;

  public constructor( schrodingerModel: SchrodingerModel, providedOptions: SchrodingerEnergyDiagramOptions ) {

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
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 14,
      right: this.levelNodes.left - 3,
      bottom: this.levelNodes.top - 5
    } );
    this.stateLayer.addChild( lEqualsText );

    // l values, centered above each level line
    for ( let l = 0; l < MOTHAConstants.MAX_STATE; l++ ) {
      const lText = new Text( l, {
        font: LABEL_FONT,
        fill: MOTHAColors.invertibleTextFillProperty,
        maxWidth: 8,
        centerX: this.getXForState( l ),
        bottom: lEqualsText.bottom
      } );
      this.stateLayer.addChild( lText );
    }

    // 'm = {value}' in the upper right corner of the diagram.
    const mEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.mStringProperty,
      value: new DerivedProperty( [ schrodingerModel.nlmProperty ], nlm => nlm.m )
    } );
    const mEqualsValueText = new RichText( mEqualsValueStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: LABEL_MAX_WIDTH,
      top: this.energyAxisHBox.top
    } );
    mEqualsValueText.localBoundsProperty.link( () => {
      mEqualsValueText.right = this.rectangle.right - 10;
    } );
    this.stateLayer.addChild( mEqualsValueText );

    // Position the electron on the level line, based on the values of n and l.
    schrodingerModel.nlmProperty.link( ( nlmNew, nlmOld ) => {
      const xPrevious = this.electronNode.centerX;
      const yPrevious = this.electronNode.bottom;

      // Move electron to new level line.
      this.electronNode.centerX = this.getXForState( nlmNew.l );
      this.electronNode.bottom = this.getYForState( nlmNew.n );

      // Draw squiggle between previous and current electron state.
      //TODO State Wrapper: I see squiggles in Downstream that do not appear in Upstream.
      //TODO Is this problematic for resetAll? It may be the case that nlmOld.n === nlmNew.n, which is an illegal transition and causes getTransitionWavelength to fail.
      if ( nlmOld !== null && !( isSettingPhetioStateProperty.value && nlmOld.n === nlmNew.n ) ) {
        this.setEnergySquiggle( xPrevious, yPrevious, this.electronNode.centerX, this.electronNode.bottom,
          photonAbsorptionModel.getTransitionWavelength( nlmOld.n, nlmNew.n ) );
      }
    } );
  }

  /**
   * Gets the x-coordinate, relative to this Node, that corresponds to the quantum number l that describes
   * the electron's state.
   */
  private getXForState( l: number ): number {
    assert && assert( l >= 0 && l < MOTHAConstants.MAX_STATE, `invalid l: ${l}` );
    return this.levelNodes.left + LEVEL_LINE_LENGTH / 2 + ( l * ( LEVEL_LINE_LENGTH + LEVEL_LINE_X_SPACING ) );
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists n-1 horizontal lines with label "n = {value}" to the right of the lines.
 */
function createLevelNode( n: number ): Node {
  assert && assert( Number.isInteger( n ), `n must be an integer: ${n}` );
  assert && assert( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.MAX_STATE, `invalid n: ${n}` );

  // Create the same number of lines for all levels, so that the "n = {n}" labels will be horizontally aligned.
  // Only the lines that are relevant will be visible.
  const lines: Node[] = [];
  for ( let l = 0; l < MOTHAConstants.MAX_STATE; l++ ) {
    const line = new Line( 0, 0, LEVEL_LINE_LENGTH, 0, {
      lineWidth: 1,
      stroke: MOTHAColors.invertibleTextFillProperty,
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
    fill: MOTHAColors.invertibleTextFillProperty,
    font: LABEL_FONT,
    maxWidth: LABEL_MAX_WIDTH
  } );

  return new HBox( {
    children: [ linesHBox, nEqualsValueText ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerEnergyDiagram', SchrodingerEnergyDiagram );