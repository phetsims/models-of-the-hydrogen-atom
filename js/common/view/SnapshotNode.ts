// Copyright 2016-2024, University of Colorado Boulder

/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Snapshot from '../model/Snapshot.js';

const INSIDE_X_MARGIN = 6;
const INSIDE_Y_MARGIN = 6;

type SelfOptions = EmptySelfOptions;

type SnapshotNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'scale'>;

export default class SnapshotNode extends Node {

  public constructor( snapshot: Snapshot, providedOptions?: SnapshotNodeOptions ) {

    const options = optionize<SnapshotNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    const titleStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.snapshotNumberNameStringProperty, {
      number: snapshot.snapshotNumber,
      name: snapshot.modelNameProperty
    } );
    const titleText = new Text( titleStringProperty, {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 300
    } );
    titleText.localBoundsProperty.link( () => {
      titleText.left = backgroundNode.left + INSIDE_X_MARGIN;
      titleText.top = backgroundNode.top + INSIDE_Y_MARGIN;
    } );

    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      listener: () => snapshot.dispose(),
      iconOptions: {
        scale: 0.04
      },
      right: backgroundNode.right - INSIDE_X_MARGIN,
      bottom: backgroundNode.bottom - INSIDE_Y_MARGIN,
      accessibleName: new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.deleteSnapshotNumberNameStringProperty, {
        number: snapshot.snapshotNumber,
        name: snapshot.modelNameProperty
      } ),
      tandem: Tandem.OPT_OUT //TODO instrument trashButton
    } );

    //TODO Under Construction
    const underConstructionText = new Text( 'Under Construction', {
      font: new PhetFont( 16 ),
      fill: 'red',
      center: backgroundNode.center
    } );

    options.children = [ backgroundNode, titleText, trashButton, underConstructionText ];

    super( options );
  }

  //TODO dispose
}

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );