// Copyright 2016-2024, University of Colorado Boulder

//TODO Needs layout work. We're just getting lucky that the chart is the right height, and title fits above the data.
/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Snapshot from '../model/Snapshot.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerChart from './SpectrometerChart.js';
import Property from '../../../../axon/js/Property.js';

const INSIDE_X_MARGIN = 6;
const INSIDE_Y_MARGIN = 4;

type SelfOptions = EmptySelfOptions;

type SnapshotNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'scale'>;

export default class SnapshotNode extends Node {

  public constructor( snapshot: Snapshot, providedOptions?: SnapshotNodeOptions ) {

    const options = optionize<SnapshotNodeOptions, SelfOptions, NodeOptions>()( {

      //TODO Needs to be mutable and isDisposable:false for PhET-iO. Delete code related to dispose.
    }, providedOptions );

    const chart = new SpectrometerChart( new Property( snapshot.dataPoints ), {
      hasTickMarks: false
    } );

    const titleStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.snapshotNumberNameStringProperty, {
      number: snapshot.snapshotNumber,
      name: snapshot.modelNameProperty
    } );
    const titleText = new Text( titleStringProperty, {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 300
    } );
    titleText.localBoundsProperty.link( () => {
      titleText.left = chart.left + INSIDE_X_MARGIN;
      titleText.top = chart.top + INSIDE_Y_MARGIN;
    } );

    const trashButtonAccessibleNameProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.deleteSnapshotButton.accessibleNameStringProperty, {
      number: snapshot.snapshotNumber,
      name: snapshot.modelNameProperty
    } );
    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      listener: () => snapshot.dispose(),
      iconOptions: {
        scale: 0.04
      },
      left: chart.right + 5,
      bottom: chart.bottom,
      accessibleName: trashButtonAccessibleNameProperty,
      tandem: Tandem.OPT_OUT //TODO instrument trashButton
    } );

    options.children = [ chart, titleText, trashButton ];

    super( options );

    this.disposeEmitter.addListener( () => {
      titleStringProperty.dispose();
      trashButtonAccessibleNameProperty.dispose();
      trashButton.dispose();
    } );

    snapshot.disposeEmitter.addListener( () => this.dispose() );
  }
}

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );