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
import BohrElectron from '../../common/model/BohrElectron.js';

const X_MARGIN = 4;
const Y_MARGIN = 5;

// How much to scale the energy values, so that spacing between the values increases.
// This is needed so that energy levels do not visually overlap.
const ENERGY_SCALE = 1.2; // 1.0 = no scaling, 2.0 = 100% increase in spacing, etc.
assert && assert( ENERGY_SCALE >= 1 );

type SelfOptions = {
  size: Dimension2;
};

type ElectronEnergyLevelDiagramNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ElectronEnergyLevelDiagramNode extends Node {

  protected readonly electronNode: Node;

  // Layer for all state (energy-level) information.
  protected readonly stateLayer: Node;

  // Layer for the squiggle between the electron's previous and current state in the diagram.
  protected readonly squiggleLayer: Node;

  //TODO protected
  public constructor( providedOptions: ElectronEnergyLevelDiagramNodeOptions ) {

    const options = optionize<ElectronEnergyLevelDiagramNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    const rectangle = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white',
      stroke: 'black'
    } );

    const arrowLength = options.size.height - 2 * Y_MARGIN;
    const energyAxis = new ArrowNode( 0, 0, 0, -arrowLength, {
      tailWidth: 2,
      stroke: null
    } );

    const energyText = new Text( ModelsOfTheHydrogenAtomStrings.energyStringProperty, {
      font: new PhetFont( 12 ),
      rotation: -Math.PI / 2,
      maxWidth: arrowLength / 2,
      tandem: options.tandem.createTandem( 'energyText' ),
      phetioVisiblePropertyInstrumented: true
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

    super( {
      children: [ rectangle, energyAxisHBox, stateLayer, squiggleLayer, electronNode ]
    } );

    this.electronNode = electronNode;
    this.stateLayer = stateLayer;
    this.squiggleLayer = squiggleLayer;
  }

  //TODO Consider replacing with this.hydrogenAtom.energyProperty.value * ENERGY_SCALE
  /**
   * Gets the electron's energy in state n, in eV.
   * The value is scaled to increase the space between values, so that they don't visually overlap in the diagram.
   */
  protected getScaledEnergy( n: number ): number {
    return ENERGY_SCALE * BohrElectron.getEnergy( n );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelDiagramNode', ElectronEnergyLevelDiagramNode );