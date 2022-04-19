// Copyright 2015-2021, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import IProperty from '../../../../axon/js/IProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import RecordStopButton from '../../../../scenery-phet/js/buttons/RecordStopButton.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Path, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

// constants
const BUTTON_COLOR = 'rgb( 245, 245, 245 )';
const DISPLAY_SIZE = new Dimension2( 510, 130 );

type SelfOptions = {};

type SpectrometerAccordionBoxOptions = SelfOptions &
  PickRequired<AccordionBoxOptions, 'tandem'> &
  PickOptional<AccordionBoxOptions, 'left' | 'top'>;

export default class SpectrometerAccordionBox extends AccordionBox {

  constructor( expandedProperty: Property<boolean>, numberOfSnapshotsProperty: IProperty<number>,
               providedOptions?: SpectrometerAccordionBoxOptions ) {

    const options = optionize<SpectrometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>( {
      fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
      stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty,

      // TODO these options do not exist in AccordionBoxOptions
      // xMargin: 5,
      // yMargin: 5,

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
    }, providedOptions );

    options.expandedProperty = expandedProperty;

    const titleNode = new Text( modelsOfTheHydrogenAtomStrings.spectrometer, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty
    } );

    //TODO order of title and subtitle is not localized
    const subtitleNode = new Text( modelsOfTheHydrogenAtomStrings.photonsEmittedNm, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.spectrometerSubtitleFillProperty
    } );

    // show subtitle only when expanded
    expandedProperty.link( expanded => {
      subtitleNode.visible = expanded;
    } );

    options.titleNode = new HBox( {
      align: 'bottom',
      spacing: 12,
      children: [ titleNode, subtitleNode ],
      maxWidth: 290, // i18n, determined empirically
      excludeInvisibleChildrenFromBounds: false
    } );

    //TODO placeholder
    const displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      cornerRadius: options.cornerRadius,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    //TODO relocate, handle reset
    //TODO does this belong here?
    const recordingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'recordingProperty' )
    } );
    recordingProperty.link( recording => {
      //TODO
    } );

    const recordStopButton = new RecordStopButton( recordingProperty, {
      radius: 15,
      xMargin: 8.25,
      yMargin: 8.25,
      baseColor: BUTTON_COLOR,
      touchAreaDilation: 5,
      tandem: options.tandem.createTandem( 'recordStopButton' )
    } );

    const resetButton = new ResetButton( {
      baseColor: BUTTON_COLOR,
      arrowColor: 'black',
      radius: recordStopButton.height / 2,
      xMargin: 4,
      yMargin: 4,
      touchAreaDilation: 5,
      listener: () => {
        //TODO
      },
      tandem: options.tandem.createTandem( 'resetButton' )
    } );

    const snapshotButton = new RectangularPushButton( {
      maxHeight: recordStopButton.height,
      baseColor: BUTTON_COLOR,
      content: new Path( cameraSolidShape, {
        fill: 'black',
        scale: 0.08
      } ),
      touchAreaXDilation: 10,
      touchAreaYDilation: 5,
      listener: () => {
        numberOfSnapshotsProperty.value =
          Math.min( MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, numberOfSnapshotsProperty.value + 1 );
      },
      tandem: options.tandem.createTandem( 'snapshotButton' )
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