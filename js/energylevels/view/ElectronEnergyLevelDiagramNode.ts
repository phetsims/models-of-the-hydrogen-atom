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

const X_MARGIN = 4;
const Y_MARGIN = 5;

type SelfOptions = {
  size: Dimension2;
};

type ElectronEnergyLevelDiagramNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ElectronEnergyLevelDiagramNode extends Node {

  //TODO protected
  public constructor( providedOptions: ElectronEnergyLevelDiagramNodeOptions ) {

    const options = optionize<ElectronEnergyLevelDiagramNodeOptions, SelfOptions, NodeOptions>()( {

    }, providedOptions );

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

    super( {
      children: [ rectangle, energyAxisHBox ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelDiagramNode', ElectronEnergyLevelDiagramNode );