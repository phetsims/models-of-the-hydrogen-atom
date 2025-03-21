// Copyright 2016-2025, University of Colorado Boulder

/**
 * SpectrometerSnapshotNode is a snapshot from the spectrometer, shown in the snapshots dialog.
 * To appease PhET-iO, a fixed number of instances are created at startup and reused.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerChart from './SpectrometerChart.js';
import Spectrometer from '../model/Spectrometer.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import SpectrometerSnapshot from '../model/SpectrometerSnapshot.js';

const INSIDE_X_MARGIN = 6;
const INSIDE_Y_MARGIN = 4;

export default class SpectrometerSnapshotNode extends Node {

  public constructor( spectrometer: Spectrometer, index: number, tandem: Tandem ) {

    const snapshotProperty = new DerivedProperty( [ spectrometer.snapshotsProperty ],
      snapshots => ( index < snapshots.length ) ? snapshots[ index ] : null, {
        phetioValueType: NullableIO( SpectrometerSnapshot.SpectrometerSnapshotIO ),
        phetioFeatured: true,
        tandem: tandem.createTandem( 'snapshotProperty' ),
        phetioDocumentation: 'The snapshot displayed by this Node, null if there is no snapshot.'
      } );

    // Display the data for the associated snapshot.
    const dataPointsProperty = new DerivedProperty( [ snapshotProperty ],
      snapshot => snapshot ? snapshot.dataPoints : [] );

    const chart = new SpectrometerChart( dataPointsProperty, {
      chartHeight: 150, // set empirically with ?debugSpectrometer
      backgroundFill: MOTHAColors.snapshotFillProperty,
      backgroundStroke: MOTHAColors.snapshotStrokeProperty
    } );

    // Display the number of the associated snapshot.
    const snapshotNumberProperty = new DerivedProperty( [ snapshotProperty ],
      snapshot => snapshot ? snapshot.snapshotNumber : -1 );

    const titleText = new Text( '', {
      font: new PhetFont( 14 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 0.75 * chart.width,
      left: chart.left + INSIDE_X_MARGIN,
      top: chart.top + INSIDE_Y_MARGIN
    } );

    // Dynamically update the title to reflect the model name in the current locale.
    snapshotProperty.link( snapshot => {
      titleText.stringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.snapshotNumberNameStringProperty, {
        number: snapshotNumberProperty,
        name: snapshot ? snapshot.hydrogenAtom.displayNameProperty : ''
      } );
    } );

    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonColorProperty,
      listener: () => {
        const snapshot = snapshotProperty.value;
        if ( snapshot ) {
          spectrometer.deleteSnapshot( snapshot );
        }
      },
      iconOptions: {
        scale: 0.76
      },
      touchAreaXDilation: 8,
      touchAreaYDilation: 8,
      left: chart.right + 5,
      bottom: chart.bottom,
      tandem: tandem.createTandem( 'trashButton' )
    } );

    // Dynamically update the trashButton's accessibleName to reflect the model name in the current locale.
    snapshotProperty.link( snapshot => {
      trashButton.accessibleName = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.deleteSnapshotButton.accessibleNameStringProperty, {
        number: snapshotNumberProperty,
        name: snapshot ? snapshot.hydrogenAtom.displayNameProperty : ''
      } );
    } );

    super( {
      isDisposable: false,
      scale: 0.9, // Set empirically so that SpectrometerSnapshotsDialog is the same width regardless of how many snapshots we have.
      children: [ chart, titleText, trashButton ],
      visibleProperty: new DerivedProperty( [ snapshotProperty ], snapshot => snapshot !== null ),
      tandem: tandem,
      phetioDocumentation: 'Displays a spectrometer snapshot. Do not confuse the tandem name of this element ' +
                           'with the snapshot number that is displayed in the user interface.'
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerSnapshotNode', SpectrometerSnapshotNode );