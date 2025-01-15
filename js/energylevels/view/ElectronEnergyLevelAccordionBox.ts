// Copyright 2015-2024, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that contains the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import MOTHAQueryParameters from '../../common/MOTHAQueryParameters.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import BohrEnergyDiagram from './BohrEnergyDiagram.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DeBroglieEnergyDiagram from './DeBroglieEnergyDiagram.js';
import SchrodingerEnergyDiagram from './SchrodingerEnergyDiagram.js';
import ExperimentEnergyDiagram from './ExperimentEnergyDiagram.js';
import EnergyDiagram from './EnergyDiagram.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

// DIAGRAM_SIZE.height was empirically set so that heights of ElectronEnergyLevelAccordionBox and
// EnergyLevelsZoomedInBoxNode are roughly the same.
const DIAGRAM_SIZE = new Dimension2( 220, 364 );

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  private readonly diagrams: EnergyDiagram[];

  public constructor( model: EnergyLevelsModel, tandem: Tandem ) {

    const titleNode = new Text( ModelsOfTheHydrogenAtomStrings.electronEnergyLevelStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.electronEnergyLevelTitleFillProperty,
      maxWidth: 150 // i18n, determined empirically
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
      children: diagrams
    } );

    super( content, combineOptions<AccordionBoxOptions>( {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {
      isDisposable: false,
      titleNode: titleNode,
      expandedDefaultValue: MOTHAQueryParameters.expandAll,
      fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
      stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.electronEnergyLevelAccordionBox.helpTextStringProperty,
      tandem: tandem
    } ) );

    this.diagrams = diagrams;
  }

  public step( dt: number ): void {
    this.diagrams.forEach( diagram => diagram.step( dt ) );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );