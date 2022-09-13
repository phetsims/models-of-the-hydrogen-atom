// Copyright 2015-2022, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that contains the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

// constants
const DIAGRAM_SIZE = new Dimension2( 220, 420 );

type SelfOptions = EmptySelfOptions;

type ElectronEnergyLevelAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<AccordionBoxOptions, 'expandedProperty' | 'tandem'>;

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  public constructor( providedOptions?: ElectronEnergyLevelAccordionBoxOptions ) {

    const options = optionize<ElectronEnergyLevelAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {

      // AccordionBoxOptions
      fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
      stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,
      cornerRadius: 5,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentXMargin: 5,
      contentYMargin: 5,
      contentYSpacing: 0,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 16,
        touchAreaYDilation: 16
      },
      buttonAlign: 'left',
      titleAlignX: 'left',
      titleXSpacing: 10
    }, providedOptions );

    options.titleNode = new Text( ModelsOfTheHydrogenAtomStrings.electronEnergyLevelStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.electronEnergyLevelTitleFillProperty,
      maxWidth: 150, // i18n, determined empirically
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    //TODO this is a placeholder
    const diagramNode = new Rectangle( 0, 0, DIAGRAM_SIZE.width, DIAGRAM_SIZE.height, {
      fill: 'white',
      stroke: 'black'
    } );

    super( diagramNode, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );