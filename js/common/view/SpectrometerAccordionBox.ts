// Copyright 2015-2025, University of Colorado Boulder

/**
 * SpectrometerAccordionBox is the accordion box that contains the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import SnapshotButton from './SnapshotButton.js';
import SpectrometerChart from './SpectrometerChart.js';
import ViewSnapshotsButton from './ViewSnapshotsButton.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Dialog from '../../../../sun/js/Dialog.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

// Uniform size of all push buttons that appear in the toolbar.
const PUSH_BUTTON_SIZE = new Dimension2( 45, 32 );

export default class SpectrometerAccordionBox extends AccordionBox {

  private readonly resetSpectrometerAccordionBox: () => void;

  public constructor( spectrometer: Spectrometer, snapshotsDialog: Dialog, tandem: Tandem ) {

    const expandedProperty = new BooleanProperty( MOTHAQueryParameters.expandAll, {
      tandem: tandem.createTandem( 'expandedProperty' ),
      phetioFeatured: true
    } );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.spectrometerPhotonsEmittedPerNanometerStringProperty, {
      cursor: 'pointer',
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.spectrometerTitleFillProperty,
      maxWidth: 400
    } );

    const snapshotButton = new SnapshotButton( spectrometer, {
      size: PUSH_BUTTON_SIZE,
      tandem: tandem.createTandem( 'snapshotButton' )
    } );

    const viewSnapshotsButton = new ViewSnapshotsButton( snapshotsDialog, spectrometer.numberOfSnapshotsProperty, {
      size: PUSH_BUTTON_SIZE,
      tandem: tandem.createTandem( 'viewSnapshotsButton' )
    } );

    const eraseButton = new EraserButton( {
      size: PUSH_BUTTON_SIZE,
      baseColor: MOTHAColors.pushButtonColorProperty,
      xMargin: 6,
      yMargin: 6,
      enabledProperty: spectrometer.hasDataPointsProperty,
      listener: () => spectrometer.clear(),
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.eraseSnapshotsButton.accessibleNameStringProperty,
      tandem: tandem.createTandem( 'eraseButton' )
    } );

    const buttonGroup = new HBox( {
      children: [ snapshotButton, viewSnapshotsButton, eraseButton ],
      spacing: 10,
      maxHeight: 25, // Set empirically, so the button group is not taller than the title bar area.
      visibleProperty: expandedProperty // Buttons are visible when the accordion box is expanded.
    } );

    const titleNode = new HBox( {
      children: [ titleText, buttonGroup ]
    } );

    const spectrometerChart = new SpectrometerChart( spectrometer.dataPointsProperty, {
      chartHeight: 135 // set empirically with ?debugSpectrometer
    } );

    super( spectrometerChart, combineOptions<AccordionBoxOptions>( {}, MOTHAConstants.ACCORDION_BOX_OPTIONS, {
      isDisposable: false,
      titleNode: titleNode,
      overrideTitleNodePickable: false,
      expandedProperty: expandedProperty,
      fill: MOTHAColors.spectrometerAccordionBoxFillProperty,
      stroke: MOTHAColors.spectrometerAccordionBoxStrokeProperty,
      tandem: tandem,
      phetioFeatured: true
    } ) );

    // Record data only when the accordion box is expanded.
    this.expandedProperty.link( expanded => {
      if ( !isSettingPhetioStateProperty.value ) {
        spectrometer.enabledProperty.value = expanded;
      }
    } );

    this.addLinkedElement( spectrometer );

    this.resetSpectrometerAccordionBox = () => {
      expandedProperty.reset();
    };
  }

  public override reset(): void {
    super.reset();
    this.resetSpectrometerAccordionBox();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerAccordionBox', SpectrometerAccordionBox );