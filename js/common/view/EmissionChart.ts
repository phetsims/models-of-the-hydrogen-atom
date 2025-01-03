// Copyright 2024, University of Colorado Boulder

/**
 * EmissionChart is the base class for the charts displayed by the Spectrometer, showing emitted photons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Line, Node, NodeOptions, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrumNode from '../../../../scenery-phet/js/SpectrumNode.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Light from '../model/Light.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import SpectrometerDataPoint from '../model/SpectrometerDataPoint.js';
import SpectrometerBarNode from './SpectrometerBarNode.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

const AXIS_HEIGHT = 4;
const TICK_LINE_LENGTH = 3;
const TICK_FONT = new PhetFont( 11 );

type SelfOptions = {

  // Whether to create tick marks at the values in providedOptions.wavelengths. Used to omit tick marks from snapshots.
  hasTickMarks?: boolean;

  // This chart will display data for these wavelengths. Data for other wavelengths will be ignored.
  wavelengths: number[];

  // Range for this chart.
  minWavelength: number;
  maxWavelength: number;

  // Node that serves as the x-axis.
  xAxis: Node;

  // Plots a wavelength value at some other value on the x-axis. Used to compress the x-axis for the UV and IR spectrums.
  plotAtX?: ( wavelength: number ) => number;
};

type EmissionChartOptions = SelfOptions;

class EmissionChart extends Node {

  protected constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                         providedOptions: EmissionChartOptions ) {

    const options = optionize<EmissionChartOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      hasTickMarks: true,
      plotAtX: wavelength => {
        assert && assert( providedOptions.wavelengths.includes( wavelength ), `${wavelength} is not a wavelength for this chart.` );
        return wavelength;
      }
    }, providedOptions );

    const xAxis = options.xAxis;
    const xAxisLength = options.xAxis.width;

    const children: Node[] = [];
    const barNodes: SpectrometerBarNode[] = [];

    options.wavelengths.forEach( wavelength => {

      assert && assert( options.plotAtX( wavelength ) >= options.minWavelength && options.plotAtX( wavelength ) <= options.maxWavelength,
        `tickValue is out of range: ${wavelength}` );

      const x = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, options.plotAtX( wavelength ) );

      if ( options.hasTickMarks ) {
        const line = new Line( 0, 0, 0, TICK_LINE_LENGTH, {
          stroke: MOTHAColors.spectrometerTickColorProperty,
          lineWidth: 1
        } );

        const text = new Text( wavelength, {
          fill: MOTHAColors.spectrometerTickColorProperty,
          font: TICK_FONT,
          rotation: -Math.PI / 2
        } );

        const tickNode = new VBox( {
          excludeInvisibleChildrenFromBounds: false,
          children: [ line, text ],
          spacing: 2,
          centerX: xAxis.left + x,
          top: xAxis.bottom,

          // Make the tick visible only when its wavelength is included in the spectrometer data set.
          visibleProperty: new DerivedProperty( [ dataPointsProperty ],
            dataPoints => !!_.find( dataPoints, dataPoint => dataPoint.wavelength === wavelength ) ||
                          MOTHAQueryParameters.showAllTicks )
        } );
        children.push( tickNode );
      }

      const barNode = new SpectrometerBarNode( wavelength );
      barNode.localBoundsProperty.link( () => {
        barNode.centerX = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, options.plotAtX( wavelength ) );
        barNode.bottom = xAxis.top - 1;
      } );
      children.push( barNode );
      barNodes.push( barNode );
    } );

    children.push( xAxis );

    options.children = children;

    // Update bars as the spectrometer data changes.
    dataPointsProperty.link( dataPoints => barNodes.forEach( barNode => {
      const wavelength = barNode.wavelength;
      const dataPoint = _.find( dataPoints, dataPoint => dataPoint.wavelength === wavelength );
      const numberOfPhotonsEmitted = !dataPoint ? 0 : dataPoint.numberOfPhotonsEmitted;
      barNode.setNumberOfPhotons( numberOfPhotonsEmitted );
    } ) );

    super( options );
  }
}

/**
 * UVEmissionChart is the spectrometer chart that shows photons emitted in the UV (ultraviolet) spectrum.
 */
class UVEmissionChart extends EmissionChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const wavelengths = [ ...photonAbsorptionModel.getUVWavelengths(), PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH ];

    // Wavelengths are brute-force remapped to compress the UV spectrum.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
    const plotAtX = ( wavelength: number ) => {
      assert && assert( wavelengths.includes( wavelength ), `${wavelength} is not a wavelength for this chart.` );
      if ( wavelength === 103 ) {
        return 100;
      }
      else if ( wavelength === 122 ) {
        return 105;
      }
      else if ( wavelength === 150 ) {
        return 112;
      }
      else {
        return wavelength;
      }
    };

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.UV_COLOR
    } );

    super( dataPointsProperty, combineOptions<EmissionChartOptions>( {
      wavelengths: wavelengths,
      minWavelength: _.min( wavelengths )! - 1,
      maxWavelength: plotAtX( _.max( wavelengths )! ) + 1,
      xAxis: xAxis,
      plotAtX: plotAtX
    }, providedOptions ) );
  }
}

/**
 * IREmissionChart is the spectrometer chart that shows photons emitted in the IR (infrared) spectrum.
 */
class IREmissionChart extends EmissionChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const wavelengths = photonAbsorptionModel.getIRWavelengths();

    // Wavelengths are brute-force remapped to compress the IR spectrum.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
    const plotAtX = ( wavelength: number ) => {
      assert && assert( wavelengths.includes( wavelength ), `${wavelength} is not a wavelength for this chart.` );
      if ( wavelength === 1876 ) {
        return 1650;
      }
      else if ( wavelength === 2626 ) {
        return 2200;
      }
      else if ( wavelength === 4052 ) {
        return 3000;
      }
      else if ( wavelength === 7460 ) {
        return 4000;
      }
      else {
        return wavelength;
      }
    };

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.IR_COLOR
    } );

    super( dataPointsProperty, combineOptions<EmissionChartOptions>( {
      wavelengths: wavelengths,
      minWavelength: 1000,
      maxWavelength: plotAtX( 7460 ) + 50,
      xAxis: xAxis,
      plotAtX: plotAtX
    }, providedOptions ) );
  }
}

/**
 * VisibleEmissionChart is the spectrometer chart that shows photons emitted in the visible spectrum.
 */
class VisibleEmissionChart extends EmissionChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const wavelengths = photonAbsorptionModel.getVisibleWavelengths();
    const minWavelength = VisibleColor.MIN_WAVELENGTH;
    const maxWavelength = Math.min( VisibleColor.MAX_WAVELENGTH, _.max( wavelengths )! + 30 );

    const xAxis = new SpectrumNode( {
      size: new Dimension2( axisLength, AXIS_HEIGHT ),
      minValue: minWavelength,
      maxValue: maxWavelength,
      valueToColor: Light.wavelengthToColor
    } );

    super( dataPointsProperty, combineOptions<EmissionChartOptions>( {
      wavelengths: wavelengths,
      minWavelength: minWavelength,
      maxWavelength: maxWavelength,
      xAxis: xAxis
    }, providedOptions ) );
  }
}

modelsOfTheHydrogenAtom.register( 'EmissionChart', EmissionChart );
export { UVEmissionChart, IREmissionChart, VisibleEmissionChart };