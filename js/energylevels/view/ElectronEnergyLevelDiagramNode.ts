// Copyright 2024, University of Colorado Boulder

/**
 * ElectronEnergyLevelDiagramNode is the base class for Electron Energy Level diagrams, responsible for the components
 * that are common to all such diagrams.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { HBox, Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ElectronNode from '../../common/view/ElectronNode.js';

// Margins inside the bounds of the diagram. If you change Y_MARGIN, you will likely need to adjust Y_OFFSETS.
const X_MARGIN = 4;
const Y_MARGIN = 5;

// Percent offset from the bottom of the Energy axis. These values were set empirically.
// Using actual energy values results in visual overlap of the levels, since higher levels are closely spaced.
const Y_OFFSETS = [ 0.025, 0.60, 0.73, 0.81, 0.86, 0.90 ];

type SelfOptions = {
  size: Dimension2;
};

export type ElectronEnergyLevelDiagramNodeOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty'>;

export default class ElectronEnergyLevelDiagramNode extends Node {

  protected readonly rectangle: Node;

  protected readonly electronNode: Node;

  protected readonly energyAxisHBox: Node;

  protected readonly energyAxisLength: number;

  // Layer for all state (energy-level) information.
  protected readonly stateLayer: Node;

  // Layer for the squiggle drawn between the electron's previous and current state in the diagram.
  protected readonly squiggleLayer: Node;

  // Constants used by subclasses.
  public static readonly LEVEL_NODE_X_OFFSET = 22;
  public static readonly LEVEL_LINE_LENGTH = 15;
  public static readonly LEVEL_LINE_X_SPACING = 4;
  public static readonly LABEL_FONT = new PhetFont( 12 );
  public static readonly LABEL_MAX_WIDTH = 40;

  protected constructor( providedOptions: ElectronEnergyLevelDiagramNodeOptions ) {

    const options = optionize<ElectronEnergyLevelDiagramNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false
    }, providedOptions );

    const rectangle = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white',
      stroke: 'black'
    } );

    const energyAxisLength = options.size.height - 2 * Y_MARGIN;
    const energyAxis = new ArrowNode( 0, 0, 0, -energyAxisLength, {
      tailWidth: 2,
      stroke: null
    } );

    const energyText = new Text( ModelsOfTheHydrogenAtomStrings.energyStringProperty, {
      font: new PhetFont( 12 ),
      rotation: -Math.PI / 2,
      maxWidth: energyAxisLength / 2
    } );

    const energyAxisHBox = new HBox( {
      excludeInvisibleChildrenFromBounds: false,
      children: [ energyText, energyAxis ],
      spacing: 1,
      align: 'center',
      left: rectangle.left + X_MARGIN,
      centerY: rectangle.centerY
    } );

    const stateLayer = new Node();
    const squiggleLayer = new Node();

    const electronNode = ElectronNode.createIcon();
    electronNode.center = rectangle.center; // a temporary location - anywhere right of the energy axis will do.

    options.children = [ rectangle, energyAxisHBox, stateLayer, squiggleLayer, electronNode ];

    super( options );

    this.rectangle = rectangle;
    this.electronNode = electronNode;
    this.energyAxisHBox = energyAxisHBox;
    this.energyAxisLength = energyAxisLength;
    this.stateLayer = stateLayer;
    this.squiggleLayer = squiggleLayer;
  }

  /**
   * Gets the y-coordinate, relative to this Node, that corresponds to the quantum number n that describes
   * the electron's state.
   */
  protected getYForState( n: number ): number {
    return Y_MARGIN + this.energyAxisLength - ( Y_OFFSETS[ n - 1 ] * this.energyAxisLength );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelDiagramNode', ElectronEnergyLevelDiagramNode );