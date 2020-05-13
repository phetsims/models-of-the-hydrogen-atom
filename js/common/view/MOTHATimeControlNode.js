// Copyright 2016-2020, University of Colorado Boulder

/**
 * TimeControls provides the controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeControlSpeed from '../../../../scenery-phet/js/TimeControlSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class MOTHATimeControlNode extends TimeControlNode {

  /**
   * @param {Property.<boolean>} runningProperty - is the sim running?
   * @param {EnumerationProperty.<TimeControlSpeed>} timeSpeedProperty
   * @param {Object} [options]
   */
  constructor( runningProperty, timeSpeedProperty, options ) {

    options = merge( {
      timeControlSpeedProperty: timeSpeedProperty,
      timeControlSpeeds: [ TimeControlSpeed.FAST, TimeControlSpeed.NORMAL, TimeControlSpeed.SLOW ],
      speedRadioButtonGroupOptions: {
        labelOptions: {
          font: new PhetFont( 14 ),
          fill: 'white'
        }
      }
    }, options );

    super( runningProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHATimeControlNode', MOTHATimeControlNode );
export default MOTHATimeControlNode;