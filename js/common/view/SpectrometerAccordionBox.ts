// Copyright 2015-2022, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import RecordStopButton from '../../../../scenery-phet/js/buttons/RecordStopButton.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignBoxOptions, AlignGroup, HBox, NodeTranslationOptions, Path, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

// constants
const DISPLAY_SIZE = new Dimension2( 510, 130 );

type SelfOptions = EmptySelfOptions;

type SpectrometerAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<AccordionBoxOptions, 'expandedProperty' | 'tandem'>;

export default class SpectrometerAccordionBox extends AccordionBox {

  public constructor( numberOfSnapshotsProperty: TProperty<number>,
                      providedOptions?: SpectrometerAccordionBoxOptions ) {

    const options = optionize<SpectrometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {

      // AccordionBoxOptions
      fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
      stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty,
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

    options.titleNode = new TitleNode( options.expandedProperty, options.tandem.createTandem( 'titleNode' ) );

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
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      touchAreaDilation: 5,
      tandem: options.tandem.createTandem( 'recordStopButton' )
    } );

    const resetButton = new ResetButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
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
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

class TitleNode extends ToggleNode<boolean> {

  public constructor( expandedProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {

    // to ensure that both titles have the same effective size, and are left aligned
    const alignBoxOptions: AlignBoxOptions = {
      group: new AlignGroup(),
      xAlign: 'left'
    };

    const titleExpandedText = new AlignBox( new Text( ModelsOfTheHydrogenAtomStrings.spectrometerExpandedStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty,
      maxWidth: 290,
      tandem: tandem.createTandem( 'titleExpandedText' )
    } ), alignBoxOptions );

    const titleCollapsedText = new AlignBox( new Text( ModelsOfTheHydrogenAtomStrings.spectrometerCollapsedStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty,
      maxWidth: 290,
      tandem: tandem.createTandem( 'titleCollapsedText' )
    } ), alignBoxOptions );

    const items = [
      { value: true, createNode: ( tandem: Tandem ) => titleExpandedText },
      { value: false, createNode: ( tandem: Tandem ) => titleCollapsedText }
    ];

    super( expandedProperty, items, {
      tandem: tandem
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );