// Copyright 2015-2025, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, HBox, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import ButtonNode from '../../../../sun/js/buttons/ButtonNode.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import SnapshotButton from './SnapshotButton.js';
import SnapshotsDialog from './SnapshotsDialog.js';
import SpectrometerChart from './SpectrometerChart.js';
import ViewSnapshotsButton from './ViewSnapshotsButton.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type SpectrometerAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class SpectrometerAccordionBox extends AccordionBox {

  public constructor( spectrometer: Spectrometer, providedOptions: SpectrometerAccordionBoxOptions ) {

    const expandedProperty = new BooleanProperty( MOTHAQueryParameters.expandAll, {
      tandem: providedOptions.tandem.createTandem( 'expandedProperty' ),
      phetioFeatured: true
    } );

    const options = optionize4<SpectrometerAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        overrideTitleNodePickable: false,
        expandedProperty: expandedProperty,
        fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
        stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty
      }, providedOptions );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.spectrometerPhotonsEmittedPerNanometerStringProperty, {
      cursor: 'pointer',
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty,
      maxWidth: 400
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

    const buttonGroup = new HButtonGroup( [ snapshotButton, viewSnapshotsButton, eraseButton ], expandedProperty, buttonGroupTandem );

    options.titleNode = new HBox( {
      children: [ titleText, buttonGroup ]
    } );

    const spectrometerChart = new SpectrometerChart( spectrometer.dataPointsProperty, {
      chartHeight: 135 // set empirically with ?debugSpectrometer
    } );

    super( spectrometerChart, options );

    // Record only when the accordion box is expanded.
    this.expandedProperty.link( expanded => spectrometer.setRecordingEnabled( expanded ) );

    this.addLinkedElement( spectrometer );
  }
}

/**
 * HButtonGroup creates a row of buttons that all have the same size. While it's tempting to think that this is
 * general enough to move to common code, it's not.
 */
class HButtonGroup extends HBox {
  public constructor( buttons: ButtonNode[], expandedProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {

    const alignGroup = new AlignGroup();

    super( {
      spacing: 10,

      // Set empirically, so the button group is not taller than the title bar area.
      maxHeight: 25,

      // Make buttons have uniform size.
      children: buttons.map( button => alignGroup.createBox( button, {
        align: 'stretch',
        visibleProperty: button.visibleProperty // for PhET-iO
      } ) ),

      // Buttons are visible when the accordion box is expanded.
      visibleProperty: new DerivedProperty( [ expandedProperty ], expanded => expanded, {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioFeatured: true,
        phetioValueType: BooleanIO
      } ),
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );