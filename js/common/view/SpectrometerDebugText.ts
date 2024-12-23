// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerDebugText is a simple text-only display of the spectrometer data, for debugging.
 * Run with ?dev to show this in the Spectrometer accordion box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SpectrometerDataPoint from '../model/SpectrometerDataPoint.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Text } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../MOTHAColors.js';

export default class SpectrometerDebugText extends Text {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]> ) {

    const stringProperty = new DerivedStringProperty( [ dataPointsProperty ],
      dataPoints => {
        let string = '';
        dataPoints.forEach( dataPoint => {
          string += `${dataPoint.wavelength}:${dataPoint.numberOfPhotonsEmitted} `;
        } );
        return string;
      } );

    super( stringProperty, {
      font: new PhetFont( 10 ),
      fill: MOTHAColors.invertibleTextFillProperty
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerDebugText', SpectrometerDebugText );