// Copyright 2015-2022, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that contains the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Rectangle, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';

// constants
const DIAGRAM_SIZE = new Dimension2( 220, 420 );

type SelfOptions = {};

type ElectronEnergyLevelAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem' | 'center'>;

export default class ElectronEnergyLevelAccordionBox extends AccordionBox {

  constructor( expandedProperty: Property<boolean>, providedOptions?: ElectronEnergyLevelAccordionBoxOptions ) {

    const options = optionize<ElectronEnergyLevelAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {
      fill: MOTHAColors.electronEnergyLevelAccordionBoxFillProperty,
      stroke: MOTHAColors.electronEnergyLevelAccordionBoxStrokeProperty,

      //TODO these options are undefined for AccordionBoxOptions
      // xMargin: 5,
      // yMargin: 5,

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

    assert && assert( !options.expandedProperty, 'ElectronEnergyLevelAccordionBox sets expandedProperty' );
    options.expandedProperty = expandedProperty;

    assert && assert( !options.titleNode, 'ElectronEnergyLevelAccordionBox sets titleNode' );
    options.titleNode = new Text( modelsOfTheHydrogenAtomStrings.electronEnergyLevel, {
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