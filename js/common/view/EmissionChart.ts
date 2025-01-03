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

  // Maps a wavelength to some other value. Used to compress the x-axis for the UV and IR spectrums.
  // The key is the original wavelength, the value is the new wavelength, and value <= key.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
  wavelengthMap?: Map<number, number> | null;
};

type EmissionChartOptions = SelfOptions;

class EmissionChart extends Node {

  protected constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                         providedOptions: EmissionChartOptions ) {

    const options = optionize<EmissionChartOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      hasTickMarks: true,
      wavelengthMap: null
    }, providedOptions );

    // If wavelengthMap was not provided, create a default map that does not change wavelengths.
    const wavelengthMap = options.wavelengthMap || new Map<number, number>( options.wavelengths.map( wavelength => [ wavelength, wavelength ] ) );

    // Verify that all wavelengths are present in the map, and that they are mapped to <= value.
    assert && assert( wavelengthMap.size === options.wavelengths.length );
    assert && assert( _.every( [ ...wavelengthMap.keys() ], key => options.wavelengths.includes( key ) ) );
    assert && assert( _.every( [ ...wavelengthMap.keys() ], key => wavelengthMap.get( key )! <= key ) );

    // Handles the remapping of a wavelength.
    const remap = ( wavelength: number ) => {
      assert && assert( options.wavelengths.includes( wavelength ), `${wavelength} is not a wavelength for this chart.` );
      const newWavelength = wavelengthMap.get( wavelength )!;
      assert && assert( newWavelength !== undefined );
      return newWavelength;
    };

    const xAxis = options.xAxis;
    const xAxisLength = options.xAxis.width;

    const children: Node[] = [];
    const barNodes: SpectrometerBarNode[] = [];

    options.wavelengths.forEach( wavelength => {

      assert && assert( remap( wavelength ) >= options.minWavelength && remap( wavelength ) <= options.maxWavelength,
        `tickValue is out of range: ${wavelength}` );

      const x = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, remap( wavelength ) );

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
        barNode.centerX = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, remap( wavelength ) );
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

    // Wavelengths are remapped to compress the IR spectrum. This is a brute-force, hardcoded approach because we
    // need fine control of the position of each tick mark on the axis. All possible wavelength are included here,
    // even when their values are not changed, because that made it easier to adjust this map iteratively, and easier
    // to validate for possible programming errors.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
    const wavelengthMap = new Map<number, number>( [
      [ 94, 94 ],
      [ 95, 95 ],
      [ 97, 97 ],
      [ 103, 100 ],
      [ 122, 105 ],
      [ 150, 112 ]
    ] );

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.UV_COLOR
    } );

    super( dataPointsProperty, combineOptions<EmissionChartOptions>( {
      wavelengths: wavelengths,
      minWavelength: wavelengthMap.get( _.min( wavelengths )! )! - 1,
      maxWavelength: wavelengthMap.get( _.max( wavelengths )! )! + 1,
      xAxis: xAxis,
      wavelengthMap: wavelengthMap
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

    // The comment about wavelengthMap in UVEmissionChart applies here.
    const wavelengthMap = new Map<number, number>( [
      [ 1094, 1094 ],
      [ 1282, 1282 ],
      [ 1876, 1650 ],
      [ 2626, 2200 ],
      [ 4052, 3000 ],
      [ 7460, 4000 ]
    ] );

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.IR_COLOR
    } );

    super( dataPointsProperty, combineOptions<EmissionChartOptions>( {
      wavelengths: wavelengths,
      minWavelength: 1000,
      maxWavelength: wavelengthMap.get( 7460 )! + 50,
      xAxis: xAxis,
      wavelengthMap: wavelengthMap
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
    const maxWavelength = _.max( wavelengths )! + 30;

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