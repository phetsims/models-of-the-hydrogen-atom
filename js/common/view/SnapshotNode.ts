// Copyright 2016-2024, University of Colorado Boulder

//TODO this is a placeholder
/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

const INSIDE_X_MARGIN = 6;
const INSIDE_Y_MARGIN = 6;

type SelfOptions = EmptySelfOptions;

type SnapshotNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'scale'>;

export default class SnapshotNode extends Node {

  public constructor( numberOfSnapshotsProperty: TProperty<number>, providedOptions?: SnapshotNodeOptions ) {

    const options = optionize<SnapshotNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    //TODO i18n
    const titleText = new Text( 'Snapshot', {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      left: backgroundNode.left + INSIDE_X_MARGIN,
      top: backgroundNode.top + INSIDE_Y_MARGIN
    } );

    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      listener: () => {
        numberOfSnapshotsProperty.value--;
      },
      iconOptions: {
        scale: 0.04
      },
      right: backgroundNode.right - INSIDE_X_MARGIN,
      bottom: backgroundNode.bottom - INSIDE_Y_MARGIN,
      tandem: Tandem.OPT_OUT //TODO SnapshotNode is dynamically created
    } );

    options.children = [ backgroundNode, titleText, trashButton ];

    super( options );
  }

  //TODO dispose
}

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );