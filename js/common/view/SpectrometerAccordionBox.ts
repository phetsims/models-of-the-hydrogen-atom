// Copyright 2015-2024, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { combineOptions, EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, HBox, HBoxOptions, PressListener, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import ButtonNode from '../../../../sun/js/buttons/ButtonNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import SnapshotButton from './SnapshotButton.js';
import SnapshotsDialog from './SnapshotsDialog.js';
import SpectrometerNode from './SpectrometerNode.js';
import ViewSnapshotsButton from './ViewSnapshotsButton.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class SpectrometerAccordionBox extends AccordionBox {

  public constructor( spectrometer: Spectrometer, providedOptions: SpectrometerAccordionBoxOptions ) {

    const options = optionize4<SpectrometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        titleBarExpandCollapse: false, // because we're putting buttons in the title bar
        overrideTitleNodePickable: false,
        expandedDefaultValue: MOTHAQueryParameters.expandAll,
        fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
        stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty
      }, providedOptions );

    // This implementation puts buttons in the title bar, and requires titleBarExpandCollapse: false.
    assert && assert( options.titleBarExpandCollapse !== undefined && !options.titleBarExpandCollapse );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.spectrometerStringProperty, {
      cursor: 'pointer',
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty,
      maxWidth: 290
    } );

    // Put all buttons under buttonGroup tandem.
    const buttonGroupTandem = options.tandem.createTandem( 'buttonGroup' );

    const snapshotButton = new SnapshotButton( spectrometer, buttonGroupTandem.createTandem( 'snapshotButton' ) );

    const snapshotsDialog = new SnapshotsDialog( spectrometer.snapshots, {
      tandem: options.tandem.createTandem( 'snapshotsDialog' )
    } );

    const viewSnapshotsButton = new ViewSnapshotsButton( snapshotsDialog, spectrometer,
      buttonGroupTandem.createTandem( 'viewSnapshotsButton' ) );

    const eraseButton = new EraserButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      xMargin: 6,
      yMargin: 6,
      enabledProperty: spectrometer.hasDataPointsProperty,
      listener: () => spectrometer.clear(),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.eraseSnapshotsButton.accessibleNameStringProperty,
      tandem: buttonGroupTandem.createTandem( 'eraseButton' )
    } );

    const buttonGroup = new HButtonGroup( [ snapshotButton, viewSnapshotsButton, eraseButton ], {
      maxHeight: 25,
      spacing: 10,
      tandem: buttonGroupTandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    options.titleNode = new HBox( {
      children: [ titleText, buttonGroup ]
    } );

    const spectrometerNode = new SpectrometerNode( spectrometer );

    super( spectrometerNode, options );

    this.expandedProperty.link( expanded => {

      // Record only when the accordion box is expanded.
      spectrometer.setRecordingEnabled( expanded );

      // Show buttons when expanded.
      buttonGroup.visible = expanded;
    } );

    // Since we are putting buttons in the title bar, we created this accordion box with titleBarExpandCollapse: false.
    // So add the ability to press the title text to toggle expand/collapse.
    titleText.addInputListener( new PressListener( {
      press: () => {
        this.expandedProperty.value = !this.expandedProperty.value;
      },
      tandem: options.tandem.createTandem( 'titleTextPressListener' )
    } ) );

    this.addLinkedElement( spectrometer );
  }
}

/**
 * HButtonGroup creates a row of buttons that all have the same size. While it's tempting to think that this is
 * general enough to move to common code, it's not.
 */
class HButtonGroup extends HBox {
  public constructor( buttons: ButtonNode[], providedOptions: StrictOmit<HBoxOptions, 'children'> & PickRequired<HBoxOptions, 'tandem'> ) {

    const alignGroup = new AlignGroup();

    super( combineOptions<HBoxOptions>( {
      children: buttons.map( button => alignGroup.createBox( button, {
        align: 'stretch',
        visibleProperty: button.visibleProperty // for PhET-iO
      } ) )
    }, providedOptions ) );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );