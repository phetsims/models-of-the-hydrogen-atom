// Copyright 2016-2022, University of Colorado Boulder

/**
 * TimeControls provides the controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

//TODO get from TimeControlNode
type TimeControlNodeOptions = {
  tandem: Tandem;
  left: number;
  top: number;
};

type SelfOptions = {};

type MOTHATimeControlNodeOptions = SelfOptions &
  PickRequired<TimeControlNodeOptions, 'tandem'> &
  PickOptional<TimeControlNodeOptions, 'left' | 'top'>;

export default class MOTHATimeControlNode extends TimeControlNode {

  // @ts-ignore TODO convert TimeControlNode to TypeScript
  constructor( runningProperty: IProperty<boolean>, timeSpeedProperty, providedOptions: MOTHATimeControlNodeOptions ) {

    const options = optionize<MOTHATimeControlNodeOptions, SelfOptions, TimeControlNodeOptions>( {

      // @ts-ignore TODO convert TimeControlNode to TypeScript
      timeSpeedProperty: timeSpeedProperty,

      // @ts-ignore TODO convert TimeSpeed to TypeScript
      timeSpeeds: [ TimeSpeed.FAST, TimeSpeed.NORMAL, TimeSpeed.SLOW ],
      speedRadioButtonGroupOptions: {
        labelOptions: {
          font: new PhetFont( 14 ),
          fill: 'white'
        }
      }
    }, providedOptions );

    super( runningProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHATimeControlNode', MOTHATimeControlNode );