// Copyright 2015-2020, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import RecordStopButton from '../../../../scenery-phet/js/buttons/RecordStopButton.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';
import MOTHAConstants from '../MOTHAConstants.js';

const photonsEmittedNmString = modelsOfTheHydrogenAtomStrings.photonsEmittedNm;
const spectrometerString = modelsOfTheHydrogenAtomStrings.spectrometer;

// constants
const BUTTON_COLOR = 'rgb( 245, 245, 245 )';
const DISPLAY_SIZE = new Dimension2( 510, 130 );

class SpectrometerAccordionBox extends AccordionBox {
  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Property.<number>} numberOfSnapshotsProperty
   * @param {Object} [options]
   */
  constructor( expandedProperty, numberOfSnapshotsProperty, options ) {

    options = merge( {
      fill: MOTHAColorProfile.spectrometerAccordionBoxFillProperty,
      stroke: MOTHAColorProfile.spectrometerAccordionBoxStrokeProperty,
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 8,
      buttonYMargin: 5,
      contentXMargin: 10,
      contentYMargin: 5,
      contentYSpacing: 0,
      buttonAlign: 'left',
      titleAlignX: 'left',
      titleXSpacing: 10,
      expandCollapseButtonOptions: {
        sideLength: 22,
        touchAreaXDilation: 10,
        touchAreaYDilation: 10
      }
    }, options );

    options.expandedProperty = expandedProperty;

    const titleNode = new Text( spectrometerString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.spectrometerTitleFillProperty
    } );

    //TODO order of title and subtitle is not localized
    const subtitleNode = new Text( photonsEmittedNmString, {
      font: new PhetFont( 14 ),
      fill: MOTHAColorProfile.spectrometerSubtitleFillProperty
    } );

    // show subtitle only when expanded
    expandedProperty.link( expanded => {
      subtitleNode.visible = expanded;
    } );

    assert && assert( !options.titleNode, 'SpectrometerAccordionBox sets titleNode' );
    options.titleNode = new HBox( {
      align: 'bottom',
      spacing: 12,
      children: [ titleNode, subtitleNode ],
      maxWidth: 290 // i18n, determined empirically
    } );

    //TODO placeholder
    const displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      cornerRadius: options.cornerRadius,
      fill: MOTHAColorProfile.spectrometerFillProperty,
      stroke: MOTHAColorProfile.spectrometerStrokeProperty
    } );

    //TODO relocate, handle reset
    const recordingProperty = new BooleanProperty( false );
    recordingProperty.link( recording => {
      //TODO
    } );

    const recordStopButton = new RecordStopButton( recordingProperty, {
      radius: 15,
      baseColor: BUTTON_COLOR,
      touchAreaDilation: 5
    } );

    const resetButton = new ResetButton( {
      baseColor: BUTTON_COLOR,
      arrowColor: 'black',
      radius: recordStopButton.height / 2,
      touchAreaDilation: 5,
      listener: () => {
        //TODO
      }
    } );

    const snapshotButton = new RectangularPushButton( {
      maxHeight: recordStopButton.height,
      baseColor: BUTTON_COLOR,
      content: new FontAwesomeNode( 'camera' ),
      touchAreaXDilation: 10,
      touchAreaYDilation: 5,
      listener: () => {
        numberOfSnapshotsProperty.value =
          Math.min( MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, numberOfSnapshotsProperty.value + 1 );
      }
    } );

    const buttonGroup = new VBox( {
      spacing: 10,
      align: 'center',
      children: [ recordStopButton, resetButton, snapshotButton ]
    } );

    const contentNode = new HBox( {
      spacing: 12,
      align: 'bottom',
      children: [ displayNode, buttonGroup ]
    } );

    super( contentNode, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );
export default SpectrometerAccordionBox;