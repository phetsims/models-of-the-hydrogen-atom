// Copyright 2015-2024, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that contains the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import MOTHAQueryParameters from '../../common/MOTHAQueryParameters.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import BohrElectronEnergyLevelDiagramNode from './BohrElectronEnergyLevelDiagramNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DeBroglieElectronEnergyLevelDiagramNode from './DeBroglieElectronEnergyLevelDiagramNode.js';
import SchrodingerElectronEnergyLevelDiagramNode from './SchrodingerElectronEnergyLevelDiagramNode.js';
import ExperimentElectronEnergyLevelDiagramNode from './ExperimentElectronEnergyLevelDiagramNode.js';

// DIAGRAM_SIZE.height was empirically set so that heights of ElectronEnergyLevelAccordionBox and
// EnergyLevelsZoomedInBoxNode are roughly the same.
const DIAGRAM_SIZE = new Dimension2( 220, 364 );

type SelfOptions = EmptySelfOptions;

type ElectronEnergyLevelAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  public constructor( model: EnergyLevelsModel, providedOptions: ElectronEnergyLevelAccordionBoxOptions ) {

    const options = optionize4<ElectronEnergyLevelAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        expandedDefaultValue: MOTHAQueryParameters.expandAll,
        fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
        stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,
        helpText: ModelsOfTheHydrogenAtomStrings.a11y.electronEnergyLevelAccordionBox.helpTextStringProperty
      }, providedOptions );

    options.titleNode = new Text( ModelsOfTheHydrogenAtomStrings.electronEnergyLevelStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.electronEnergyLevelTitleFillProperty,
      maxWidth: 150 // i18n, determined empirically
    } );

    const bohrDiagramNode = new BohrElectronEnergyLevelDiagramNode( model.bohrModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.bohrModel ),
      tandem: options.tandem.createTandem( 'bohrDiagramNode' )
    } );

    const deBroglieDiagramNode = new DeBroglieElectronEnergyLevelDiagramNode( model.deBroglieModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.deBroglieModel ),
      tandem: options.tandem.createTandem( 'deBroglieDiagramNode' )
    } );

    const schrodingerDiagramNode = new SchrodingerElectronEnergyLevelDiagramNode( model.schrodingerModel, {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.schrodingerModel ),
      tandem: options.tandem.createTandem( 'schrodingerDiagramNode' )
    } );

    const experimentDiagramNode = new ExperimentElectronEnergyLevelDiagramNode( {
      size: DIAGRAM_SIZE,
      visibleProperty: new DerivedProperty( [ model.hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === model.experiment )
    } );

    const content = new Node( {
      children: [ bohrDiagramNode, deBroglieDiagramNode, schrodingerDiagramNode, experimentDiagramNode ]
    } );

    super( content, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );