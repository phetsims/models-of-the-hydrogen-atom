// Copyright 2015-2025, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that displays the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import BohrEnergyDiagram from './BohrEnergyDiagram.js';
import DeBroglieEnergyDiagram from './DeBroglieEnergyDiagram.js';
import EnergyDiagram from './EnergyDiagram.js';
import ExperimentEnergyDiagram from './ExperimentEnergyDiagram.js';
import SchrodingerEnergyDiagram from './SchrodingerEnergyDiagram.js';

// DIAGRAM_SIZE.height was set empirically, so that heights of ElectronEnergyLevelAccordionBox and
// EnergyLevelsZoomedInBoxNode are roughly the same.
const DIAGRAM_SIZE = new Dimension2( 220, 364 );

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  // A diagram for each atomic model.
  private readonly diagrams: EnergyDiagram[];

  public constructor( model: EnergyLevelsModel, tandem: Tandem ) {

    const titleNode = new Text( ModelsOfTheHydrogenAtomStrings.electronEnergyLevelStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.electronEnergyLevelTitleFillProperty,
      maxWidth: 150
    } );

    const bohrEnergyDiagram = new BohrEnergyDiagram( model.bohrModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.bohrModel )
    } );

    const deBroglieEnergyDiagram = new DeBroglieEnergyDiagram( model.deBroglieModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.deBroglieModel )
    } );

    const schrodingerEnergyDiagram = new SchrodingerEnergyDiagram( model.schrodingerModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.schrodingerModel )
    } );

    const experimentEnergyDiagram = new ExperimentEnergyDiagram( {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.experiment )
    } );

    const diagrams = [ bohrEnergyDiagram, deBroglieEnergyDiagram, schrodingerEnergyDiagram, experimentEnergyDiagram ];

    const content = new Node( {
      children: diagrams,
      accessibleParagraph: ModelsOfTheHydrogenAtomStrings.a11y.electronEnergyLevelAccordionBox.accessibleParagraphStringProperty
    } );

    super( content, combineOptions<AccordionBoxOptions>( {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {
      isDisposable: false,
      titleNode: titleNode,
      expandedDefaultValue: true, // Initially expanded because this is the feature that is new to the Energy Levels screen.
      fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
      stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,
      tandem: tandem
    } ) );

    this.diagrams = diagrams;
  }

  public override reset(): void {
    this.diagrams.forEach( diagram => diagram.reset() );
    super.reset();
  }

  /**
   * Steps each diagram.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    this.diagrams.forEach( diagram => diagram.step( dt ) ); // Very low cost to step all diagrams.
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );