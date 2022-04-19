// Copyright 2016-2021, University of Colorado Boulder

//TODO this is a placeholder
/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import trashAltRegularShape from '../../../../sherpa/js/fontawesome-5/trashAltRegularShape.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {};

type SnapshotNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'scale'>;

export default class SnapshotNode extends Node {

  constructor( numberOfSnapshotsProperty: IProperty<number>, providedOptions?: SnapshotNodeOptions ) {

    const options = optionize<SnapshotNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO
    }, providedOptions );

    const backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: 5,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    //TODO i18n
    const titleNode = new Text( 'Snapshot', {
      font: new PhetFont( 16 ),
      fill: MOTHAColors.snapshotTextFillProperty,
      left: backgroundNode.left + 10,
      top: backgroundNode.top + 10
    } );

    const trashButton = new RectangularPushButton( {
      content: new Path( trashAltRegularShape, {
        scale: 0.052,
        fill: 'black'
      } ),
      baseColor: 'rgb( 200, 200, 200 )',
      listener: () => {
        numberOfSnapshotsProperty.value--;
      },
      right: backgroundNode.right - 10,
      bottom: backgroundNode.bottom - 10,
      tandem: Tandem.OPT_OUT //TODO ShapshotNode is dynamically created
    } );

    options.children = [ backgroundNode, titleNode, trashButton ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );