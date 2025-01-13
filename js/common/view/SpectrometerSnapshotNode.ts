// Copyright 2016-2025, University of Colorado Boulder

//TODO Needs layout work. We're just getting lucky that the chart is the right height, and title fits above the data.
/**
 * SpectrometerSnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SpectrometerSnapshot from '../model/SpectrometerSnapshot.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerChart from './SpectrometerChart.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';

const INSIDE_X_MARGIN = 6;
const INSIDE_Y_MARGIN = 4;

export default class SpectrometerSnapshotNode extends Node {

  public readonly snapshotProperty: Property<SpectrometerSnapshot | null>;

  public constructor( tandem: Tandem ) {

    const snapshotProperty = new Property<SpectrometerSnapshot | null>( null, {
      phetioValueType: NullableIO( SpectrometerSnapshot.SpectrometerSnapshotIO ),
      phetioReadOnly: true,
      phetioFeatured: true,
      tandem: tandem.createTandem( 'snapshotProperty' ),
      phetioDocumentation: 'The snapshot displayed by this Node, null if there is no snapshot.'
    } );

    const snapshotNumberProperty = new DerivedProperty( [ snapshotProperty ], snapshot => {
      if ( snapshot ) {
        return snapshot.snapshotNumber;
      }
      else {
        return -1;
      }
    } );

    const modelNameProperty = new DerivedProperty( [ snapshotProperty ], snapshot => {
      if ( snapshot ) {
        return snapshot.hydrogenAtom.displayNameProperty.value;
      }
      else {
        return null;
      }
    } );

    const dataPointsProperty = new DerivedProperty( [ snapshotProperty ], snapshot => {
      if ( snapshot ) {
        return snapshot.dataPoints;
      }
      else {
        return [];
      }
    } );

    const chart = new SpectrometerChart( dataPointsProperty, {
      chartHeight: 150, // set empirically with ?debugSpectrometer
      backgroundFill: MOTHAColors.snapshotFillProperty,
      backgroundStroke: MOTHAColors.snapshotStrokeProperty
    } );

    const titleStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.snapshotNumberNameStringProperty, {
      number: snapshotNumberProperty,
      name: modelNameProperty
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
      number: snapshotNumberProperty,
      name: modelNameProperty
    } );
    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      listener: () => {
        if ( snapshotProperty.value ) {
          snapshotProperty.value.dispose();
        }
      },
      iconOptions: {
        scale: 0.04
      },
      left: chart.right + 5,
      bottom: chart.bottom,
      accessibleName: trashButtonAccessibleNameProperty,
      tandem: tandem.createTandem( 'trashButton' )
    } );

    super( {
      isDisposable: false,
      children: [ chart, titleText, trashButton ],
      scale: 0.9, //TODO can this be 1 ?
      visibleProperty: new DerivedProperty( [ snapshotProperty ], snapshot => snapshot !== null ),
      tandem: tandem,
      phetioDocumentation: 'Displays a spectrometer snapshot. Do not confuse the tandem name of this element ' +
                           'with the snapshot number that is displayed in the user interface.'
    } );

    this.snapshotProperty = snapshotProperty;
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerSnapshotNode', SpectrometerSnapshotNode );