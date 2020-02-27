// Copyright 2019, University of Colorado Boulder

/**
 * ClockSpeeds defines the speed options for the simulation clock.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

const ClockSpeeds = Enumeration.byKeys( [ 'FAST', 'NORMAL', 'SLOW' ] );

modelsOfTheHydrogenAtom.register( 'ClockSpeeds', ClockSpeeds );
export default ClockSpeeds;