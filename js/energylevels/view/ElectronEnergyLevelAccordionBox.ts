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
import { NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAQueryParameters from '../../common/MOTHAQueryParameters.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';

const DIAGRAM_SIZE = new Dimension2( 220, 420 );

type SelfOptions = EmptySelfOptions;

type ElectronEnergyLevelAccordionBoxOptions = SelfOptions & NodeTranslationOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  public constructor( providedOptions: ElectronEnergyLevelAccordionBoxOptions ) {

    const options = optionize4<ElectronEnergyLevelAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        expandedDefaultValue: MOTHAQueryParameters.expandAll,
        fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
        stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,
        accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.electronEnergyLevelsStringProperty,
        helpText: ModelsOfTheHydrogenAtomStrings.a11y.electronEnergyLevelsHelpTextStringProperty
      }, providedOptions );

    options.titleNode = new Text( ModelsOfTheHydrogenAtomStrings.electronEnergyLevelStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.electronEnergyLevelTitleFillProperty,
      maxWidth: 150 // i18n, determined empirically
    } );

    //TODO this is a placeholder
    const diagramNode = new Rectangle( 0, 0, DIAGRAM_SIZE.width, DIAGRAM_SIZE.height, {
      fill: 'white',
      stroke: 'black'
    } );

    super( diagramNode, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );