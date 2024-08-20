// Copyright 2015-2024, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Path, Text, VBox } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import eyeSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSolidShape.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Spectrometer from '../model/Spectrometer.js';
import SnapshotsDialog from './SnapshotsDialog.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import SpectrometerNode from './SpectrometerNode.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class SpectrometerAccordionBox extends AccordionBox {

  public constructor( spectrometer: Spectrometer, providedOptions: SpectrometerAccordionBoxOptions ) {

    const options = optionize4<SpectrometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        expandedDefaultValue: MOTHAQueryParameters.expandAll,
        titleNode: new Text( ModelsOfTheHydrogenAtomStrings.spectrometerStringProperty, {
          font: new PhetFont( { size: 16, weight: 'bold' } ),
          fill: MOTHAColors.spectrometerTitleFillProperty,
          maxWidth: 290
        } ),
        fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
        stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty
      }, providedOptions );

    const spectrometerNode = new SpectrometerNode( spectrometer );

    //TODO relocate, handle reset
    //TODO does this belong here?
    const recordingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'recordingProperty' )
    } );
    recordingProperty.link( recording => {
      if ( !isSettingPhetioStateProperty.value ) {
        //TODO Erase what is currently shown on the spectrometer and start recording.
      }
    } );

    const snapshotButton = new RectangularPushButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Path( cameraSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      listener: () => {
        spectrometer.numberOfSnapshotsProperty.value =
          Math.min( MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, spectrometer.numberOfSnapshotsProperty.value + 1 );
      },
      enabledProperty: new DerivedProperty( [ spectrometer.numberOfSnapshotsProperty ],
        numberOfSnapshots => numberOfSnapshots < MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS ),
      tandem: options.tandem.createTandem( 'snapshotButton' )
    } );

    const snapshotsDialog = new SnapshotsDialog( spectrometer.numberOfSnapshotsProperty, {
      tandem: options.tandem.createTandem( 'snapshotsDialog' )
    } );

    const viewSnapshotsButtonTandem = options.tandem.createTandem( 'viewSnapshotsButton' );
    const viewSnapshotsButton = new RectangularPushButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      content: new Path( eyeSolidShape, {
        fill: 'black',
        scale: 0.05
      } ),
      listener: () => snapshotsDialog.show(),
      // Enabled when we have snapshots
      enabledProperty: new DerivedProperty( [ spectrometer.numberOfSnapshotsProperty ], n => ( n > 0 ), {
        tandem: viewSnapshotsButtonTandem.createTandem( 'enabledProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: viewSnapshotsButtonTandem
    } );

    const eraseButton = new EraserButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      xMargin: 6,
      yMargin: 6,
      //TODO enabledProperty: spectrometer.hasDataProperty
      listener: () => spectrometer.clear(),
      tandem: options.tandem.createTandem( 'eraseButton' )
    } );

    const buttonGroup = new VBox( {
      stretch: true,
      spacing: 7,
      align: 'center',
      children: [ snapshotButton, viewSnapshotsButton, eraseButton ],
      maxHeight: spectrometerNode.height
    } );

    const contentNode = new HBox( {
      spacing: 5,
      align: 'bottom',
      children: [ spectrometerNode, buttonGroup ]
    } );

    super( contentNode, options );

    // Record only when the accordion box is expanded.
    this.expandedProperty.link( expanded => spectrometer.setRecordingEnabled( expanded ) );

    this.addLinkedElement( spectrometer );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );