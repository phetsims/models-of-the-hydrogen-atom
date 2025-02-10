// Copyright 2024-2025, University of Colorado Boulder

/**
 * EnergyDiagram is the base class for Electron Energy Level diagrams, responsible for the components
 * that are common to all such diagrams.
 *
 * This was AbstractEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import ElectronNode from '../../common/view/ElectronNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergySquiggle from './EnergySquiggle.js';
import QuantumElectron from '../../common/model/QuantumElectron.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

// Margins inside the bounds of the diagram. If you change Y_MARGIN, you will likely need to adjust Y_OFFSETS.
const X_MARGIN = 4;
const Y_MARGIN = 5;

// Percent offset from the bottom of the Energy axis, where the horizontal level lines will appear, index by n-1.
// These values were set empirically. Using actual energy values results in visual overlap of the levels, since
// higher levels are closely spaced.
const Y_OFFSETS = [ 0.025, 0.60, 0.73, 0.81, 0.86, 0.90 ];

type SelfOptions = {

  // Dimensions of the diagram.
  size: Dimension2;

  // Creates a Node for a specified energy level n.
  createLevelNode?: ( n: number ) => Node;
};

export type EnergyDiagramOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty'>;

export default class EnergyDiagram extends Node {

  // Background rectangle for the diagram.
  protected readonly backgroundRectangle: Node;

  // Electron that moves around in the diagram according to its energy level.
  protected readonly electronNode: Node;

  // HBox that includes the energy (y) axis and its label.
  protected readonly energyAxisHBox: Node;

  // Length of the energy (y) axis.
  protected readonly energyAxisLength: number;

  // Layer for all state (energy-level) information.
  protected readonly stateLayer: Node;

  // Squiggle drawn between the electron's previous and current state in the diagram.
  private readonly energySquiggle: EnergySquiggle;

  // A Node for each energy level.
  protected readonly levelNodes: Node;

  // Constants used by subclasses.
  public static readonly LEVEL_NODE_X_OFFSET = 22;
  public static readonly LEVEL_LINE_LENGTH = 15;
  public static readonly LEVEL_LINE_X_SPACING = 4;
  public static readonly LABEL_FONT = new PhetFont( 12 );
  public static readonly LABEL_MAX_WIDTH = 40;

  protected constructor( providedOptions: EnergyDiagramOptions ) {

    const options = optionize<EnergyDiagramOptions, StrictOmit<SelfOptions, 'createLevelNode'>, NodeOptions>()( {

      // NodeOptions
      isDisposable: false
    }, providedOptions );

    const backgroundRectangle = new Rectangle( 0, 0, options.size.width, options.size.height );

    const energyAxisLength = options.size.height - 2 * Y_MARGIN;
    const energyAxis = new ArrowNode( 0, 0, 0, -energyAxisLength, {
      tailWidth: 2,
      fill: MOTHAColors.invertibleTextFillProperty,
      stroke: null
    } );

    const energyText = new Text( ModelsOfTheHydrogenAtomStrings.energyStringProperty, {
      font: new PhetFont( 12 ),
      rotation: -Math.PI / 2,
      maxWidth: energyAxisLength / 2,
      fill: MOTHAColors.invertibleTextFillProperty
    } );

    const energyAxisHBox = new HBox( {
      excludeInvisibleChildrenFromBounds: false,
      children: [ energyText, energyAxis ],
      spacing: 1,
      align: 'center',
      left: backgroundRectangle.left + X_MARGIN,
      centerY: backgroundRectangle.centerY
    } );

    const stateLayer = new Node();
    const energySquiggle = new EnergySquiggle();

    const electronNode = ElectronNode.createIcon();
    electronNode.center = backgroundRectangle.center; // a temporary location - anywhere right of the energy axis will do.

    options.children = [ backgroundRectangle, energyAxisHBox, stateLayer, electronNode, energySquiggle ];

    super( options );

    this.backgroundRectangle = backgroundRectangle;
    this.electronNode = electronNode;
    this.energyAxisHBox = energyAxisHBox;
    this.energyAxisLength = energyAxisLength;
    this.stateLayer = stateLayer;
    this.energySquiggle = energySquiggle;

    // Create a Node for each energy level.
    this.levelNodes = new Node();
    if ( options.createLevelNode ) {
      for ( let n = QuantumElectron.GROUND_STATE; n <= QuantumElectron.MAX_STATE; n++ ) {
        const levelNode = options.createLevelNode( n );
        const levelNodeLeftCenter = new Vector2( this.energyAxisHBox.right + EnergyDiagram.LEVEL_NODE_X_OFFSET, this.getYForState( n ) );
        levelNode.localBoundsProperty.link( () => {
          levelNode.leftCenter = levelNodeLeftCenter;
        } );
        this.levelNodes.addChild( levelNode );
      }
      this.stateLayer.addChild( this.levelNodes );
    }
  }

  /**
   * Steps the energy squiggle.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    this.energySquiggle.step( dt );
  }

  /**
   * Gets the y-coordinate, relative to this Node, that corresponds to the quantum number n that describes
   * the electron's state.
   */
  protected getYForState( n: number ): number {
    return Y_MARGIN + this.energyAxisLength - ( Y_OFFSETS[ n - 1 ] * this.energyAxisLength );
  }

  /**
   * Mutates the energy squiggle to correspond to connect the electron's previous and current level lines,
   * with color and period matched to the wavelength that was responsible for the transition.
   */
  protected setEnergySquiggle( x1: number, y1: number, x2: number, y2: number, wavelength: number ): void {
    this.energySquiggle.update( x1, y1, x2, y2, wavelength );
  }

  protected hideEnergySquiggle(): void {
    this.energySquiggle.visible = false;
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyDiagram', EnergyDiagram );