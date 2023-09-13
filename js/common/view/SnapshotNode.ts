// Copyright 2016-2023, University of Colorado Boulder

//TODO this is a placeholder https://github.com/phetsims/tasks/issues/1129
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

type SelfOptions = EmptySelfOptions;

type SnapshotNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'scale'>;

export default class SnapshotNode extends Node {

  public constructor( numberOfSnapshotsProperty: TProperty<number>, providedOptions?: SnapshotNodeOptions ) {

    const options = optionize<SnapshotNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO default values for options https://github.com/phetsims/tasks/issues/1129
    }, providedOptions );

    const backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: 5,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    //TODO i18n https://github.com/phetsims/tasks/issues/1129
    const titleText = new Text( 'Snapshot', {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.snapshotTextFillProperty,
      left: backgroundNode.left + 10,
      top: backgroundNode.top + 10
    } );

    const trashButton = new TrashButton( {
      baseColor: MOTHAColors.pushButtonBaseColorProperty,
      listener: () => {
        numberOfSnapshotsProperty.value--;
      },
      right: backgroundNode.right - 10,
      bottom: backgroundNode.bottom - 10,
      tandem: Tandem.OPT_OUT //TODO SnapshotNode is dynamically created https://github.com/phetsims/tasks/issues/1129
    } );

    options.children = [ backgroundNode, titleText, trashButton ];

    super( options );
  }

  //TODO dispose https://github.com/phetsims/tasks/issues/1129
}

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );