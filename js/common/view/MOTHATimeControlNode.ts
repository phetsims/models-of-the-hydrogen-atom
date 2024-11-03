// Copyright 2016-2024, University of Colorado Boulder

/**
 * TimeControls provides the controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TimeControlNode, { TimeControlNodeOptions } from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type MOTHATimeControlNodeOptions = SelfOptions & PickRequired<TimeControlNodeOptions, 'tandem'>;

export default class MOTHATimeControlNode extends TimeControlNode {

  public constructor( isPlayingProperty: Property<boolean>,
                      timeSpeedProperty: EnumerationProperty<TimeSpeed>,
                      stepOnce: () => void,
                      providedOptions: MOTHATimeControlNodeOptions ) {

    const options = optionize<MOTHATimeControlNodeOptions, SelfOptions, TimeControlNodeOptions>()( {

      // TimeControlNodeOptions
      isDisposable: false,
      timeSpeedProperty: timeSpeedProperty,
      timeSpeeds: MOTHAConstants.TIME_SPEEDS,
      buttonGroupXSpacing: 25,
      speedRadioButtonGroupOptions: {
        labelOptions: {
          font: new PhetFont( 14 ),
          fill: MOTHAColors.invertibleTextFillProperty
        }
      },
      playPauseStepButtonOptions: {
        playPauseButtonOptions: {
          //TODO https://github.com/phetsims/scenery-phet/issues/682 workaround, we do not want partial hotkey support for TimeControlNode
          includeGlobalHotkey: false
        },
        stepForwardButtonOptions: {
          listener: () => stepOnce()
        }
      }
    }, providedOptions );

    super( isPlayingProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHATimeControlNode', MOTHATimeControlNode );