// Copyright 2015-2020, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox is the accordion box that contains the electron energy level diagram.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import MOTHAColorProfile from '../../common/MOTHAColorProfile.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

const electronEnergyLevelString = modelsOfTheHydrogenAtomStrings.electronEnergyLevel;

// constants
const DIAGRAM_SIZE = new Dimension2( 220, 420 );

class ElectronEnergyLevelAccordionBox extends AccordionBox {

  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   */
  constructor( expandedProperty, options ) {

    options = merge( {
      fill: MOTHAColorProfile.electronEnergyLevelAccordionBoxFillProperty,
      stroke: MOTHAColorProfile.electronEnergyLevelAccordionBoxStrokeProperty,
      xMargin: 5,
      yMargin: 5,
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
    }, options );

    assert && assert( !options.expandedProperty, 'ElectronEnergyLevelAccordionBox sets expandedProperty' );
    options.expandedProperty = expandedProperty;

    assert && assert( !options.titleNode, 'ElectronEnergyLevelAccordionBox sets titleNode' );
    options.titleNode = new Text( electronEnergyLevelString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.electronEnergyLevelTitleFillProperty,
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
export default ElectronEnergyLevelAccordionBox;