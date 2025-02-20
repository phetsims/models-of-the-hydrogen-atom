// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHATimeControlNode provides the controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class MOTHATimeControlNode extends TimeControlNode {

  public constructor( isPlayingProperty: Property<boolean>,
                      timeSpeedProperty: EnumerationProperty<TimeSpeed>,
                      stepOnce: () => void,
                      tandem: Tandem ) {

    const timeSpeeds = timeSpeedProperty.validValues!;
    assert && assert( timeSpeeds, 'timeSpeedProperty must have validValues.' );

    super( isPlayingProperty, {
      isDisposable: false,
      timeSpeedProperty: timeSpeedProperty,
      timeSpeeds: [ ...timeSpeeds ],
      flowBoxSpacing: 20,
      speedRadioButtonGroupOptions: {
        labelOptions: {
          font: new PhetFont( 14 ),
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 65 // Determined empirically in the Energy Levels screen, where there is less space for the controls.
        },
        mouseAreaXDilation: 6,
        touchAreaXDilation: 6
      },
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => stepOnce()
        }
      },
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHATimeControlNode', MOTHATimeControlNode );