// Copyright 2024, University of Colorado Boulder

/**
 * WavelengthAxisNode is a portion of the x-axis (wavelength) displayed by the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Line, Node, NodeOptions, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
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

const AXIS_HEIGHT = 4;
const TICK_LINE_LENGTH = 3;
const TICK_FONT = new PhetFont( 8 );

type SelfOptions = {
  wavelengths: number[];
  minWavelength: number;
  maxWavelength: number;
  xAxis: Node;
};

type SpectrumChartOptions = SelfOptions;

export default class SpectrumChart extends Node {

  protected constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                         provideOptions: SpectrumChartOptions ) {

    const options = optionize<SpectrumChartOptions, SelfOptions, NodeOptions>()( {}, provideOptions );

    const xAxis = options.xAxis;
    const xAxisLength = options.xAxis.width;

    const children: Node[] = [];
    const barNodes: SpectrometerBarNode[] = [];

    options.wavelengths.forEach( wavelength => {

      assert && assert( wavelength >= options.minWavelength && wavelength <= options.maxWavelength,
        `tickValue is out of range: ${wavelength}` );

      const x = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, wavelength );

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
          dataPoints => !!_.find( dataPoints, dataPoint => dataPoint.wavelength === wavelength ) )
      } );
      children.push( tickNode );

      const barNode = new SpectrometerBarNode( wavelength );
      barNode.localBoundsProperty.link( () => {
        barNode.centerX = Utils.linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, wavelength );
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
 * UVSpectrumChart is the spectrometer chart for the UV spectrum.
 */
class UVSpectrumChart extends SpectrumChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>, axisLength: number ) {

    const wavelengths = [ ...photonAbsorptionModel.getUVWavelengths(), PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH ];

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.UV_COLOR
    } );

    super( dataPointsProperty, {
      wavelengths: wavelengths,
      minWavelength: _.min( wavelengths )! - 1,
      maxWavelength: _.max( wavelengths )! + 1,
      xAxis: xAxis
    } );
  }
}

/**
 * IRSpectrumChart is the spectrometer chart for the UV spectrum.
 */
class IRSpectrumChart extends SpectrumChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>, axisLength: number ) {

    const wavelengths = photonAbsorptionModel.getIRWavelengths();

    const xAxis = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.IR_COLOR
    } );

    super( dataPointsProperty, {
      wavelengths: wavelengths,
      minWavelength: 1000,
      maxWavelength: 7500,
      xAxis: xAxis
    } );
  }
}

/**
 * IRSpectrumChart is the spectrometer chart for the visible spectrum.
 */
class VisibleSpectrumChart extends SpectrumChart {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>, axisLength: number ) {

    const wavelengths = photonAbsorptionModel.getVisibleWavelengths();

    const xAxis = new SpectrumNode( {
      size: new Dimension2( axisLength, AXIS_HEIGHT ),
      minValue: VisibleColor.MIN_WAVELENGTH,
      maxValue: VisibleColor.MAX_WAVELENGTH,
      valueToColor: Light.wavelengthToColor
    } );

    super( dataPointsProperty, {
      wavelengths: wavelengths,
      minWavelength: VisibleColor.MIN_WAVELENGTH,
      maxWavelength: VisibleColor.MAX_WAVELENGTH,
      xAxis: xAxis
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrumChart', SpectrumChart );
export { UVSpectrumChart, IRSpectrumChart, VisibleSpectrumChart };