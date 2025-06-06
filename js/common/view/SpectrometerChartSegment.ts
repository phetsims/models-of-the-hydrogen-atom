// Copyright 2024-2025, University of Colorado Boulder

/**
 * SpectrometerChartSegment is the base class for a segment of the chart displayed by the Spectrometer,
 * It shows emitted photons for a range of wavelengths.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SpectrumNode from '../../../../scenery-phet/js/SpectrumNode.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import LightSource from '../model/LightSource.js';
import PhotonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import SpectrometerDataPoint from '../model/SpectrometerDataPoint.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerBarNode from './SpectrometerBarNode.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import { linear } from '../../../../dot/js/util/linear.js';

const TICK_LINE_LENGTH = 3;
const TICK_FONT = new PhetFont( 11 );
const X_AXIS_LABEL_FONT = new PhetFont( 14 );

// To ensure that all x-axis labels have the same effective height, so that they can be bottom aligned.
const X_AXIS_LABEL_ALIGN_GROUP = new AlignGroup( {
  matchHorizontal: false,
  matchVertical: true
} );

type SelfOptions = {

  // Whether to create tick marks at the values in providedOptions.wavelengths. Used to omit tick marks from snapshots.
  hasTickMarks?: boolean;

  // Whether to create a label below the x-axis.
  hasAxisLabel?: boolean;

  // Node that serves as the x-axis.
  xAxis: Node;

  // This chart will display data for these wavelengths. Data for other wavelengths will be ignored.
  wavelengths: number[];

  // Range for this chart.
  minWavelength: number;
  maxWavelength: number;

  // Maps a wavelength to some other value. Used to compress the x-axis for the UV and IR spectrums.
  // The key is the original wavelength, the value is the new wavelength, and value <= key.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
  wavelengthMap?: Map<number, number> | null;
};

type EmissionChartOptions = SelfOptions;

export default class SpectrometerChartSegment extends Node {

  // Height (or thickness) of the x-axis.
  public static readonly X_AXIS_HEIGHT = 4;

  protected constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                         xAxisStringProperty: TReadOnlyProperty<string>,
                         providedOptions: EmissionChartOptions ) {

    const options = optionize<EmissionChartOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      hasTickMarks: true,
      hasAxisLabel: true,
      wavelengthMap: null
    }, providedOptions );

    // Verify that all wavelengths are present in the map, and that they are mapped to <= value.
    if ( assert && options.wavelengthMap ) {
      const wavelengthMap = options.wavelengthMap;
      assert && assert( wavelengthMap.size === options.wavelengths.length );
      assert && assert( _.every( [ ...wavelengthMap.keys() ], key => options.wavelengths.includes( key ) ) );
      assert && assert( _.every( [ ...wavelengthMap.keys() ], key => wavelengthMap.get( key )! <= key ) );
    }

    // Handles the remapping of a wavelength.
    const remap = ( wavelength: number ) => {
      if ( options.wavelengthMap ) {
        const newWavelength = options.wavelengthMap.get( wavelength )!;
        assert && assert( newWavelength !== undefined, `No entry found for wavelength ${wavelength}` );
        return newWavelength;
      }
      else {
        return wavelength;
      }
    };

    const xAxis = options.xAxis;
    const xAxisLength = options.xAxis.width;

    const children: Node[] = [];
    const barNodes: SpectrometerBarNode[] = [];

    options.wavelengths.forEach( wavelength => {

      assert && assert( remap( wavelength ) >= options.minWavelength && remap( wavelength ) <= options.maxWavelength,
        `wavelength is out of range: ${wavelength}` );

      // Convert wavelength to the position on the x-axis.
      const x = linear( options.minWavelength, options.maxWavelength, 0, xAxisLength, remap( wavelength ) );

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
            dataPoints => !!_.find( dataPoints, dataPoint => dataPoint.wavelength === wavelength ) )
        } );
        children.push( tickNode );
      }

      const barNode = new SpectrometerBarNode( wavelength );
      barNode.localBoundsProperty.link( () => {
        barNode.centerX = x;
        barNode.bottom = xAxis.top - 1;
      } );
      children.push( barNode );
      barNodes.push( barNode );
    } );

    children.push( xAxis );

    // x-axis label, visible only when there is no data, because tick marks would overlap.
    if ( options.hasAxisLabel ) {
      const xAxisLabel = new Text( xAxisStringProperty, {
        font: X_AXIS_LABEL_FONT,
        maxWidth: 0.75 * xAxisLength,
        fill: MOTHAColors.invertibleTextFillProperty,
        visibleProperty: new DerivedProperty( [ dataPointsProperty ], dataPoints => dataPoints.length === 0 )
      } );

      // xAxisLabelAlignGroup ensures that all x-axis labels have the same effective height, so that they
      // can be bottom aligned.
      const xAxisAlignBox = new AlignBox( xAxisLabel, {
        group: X_AXIS_LABEL_ALIGN_GROUP,
        xAlign: 'center',
        yAlign: 'bottom'
      } );
      children.push( xAxisAlignBox );

      // Note that listening to localBoundsProperty did not provide the desired behavior here.
      xAxisAlignBox.boundsProperty.link( () => {
        xAxisAlignBox.centerX = xAxis.centerX;
        xAxisAlignBox.top = xAxis.bottom + 3;
      } );
    }

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
 * UVChartSegment is the segment of the spectrometer chart that shows photons emitted in the UV (ultraviolet) spectrum.
 */
class UVChartSegment extends SpectrometerChartSegment {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const xAxis = new Rectangle( 0, 0, axisLength, SpectrometerChartSegment.X_AXIS_HEIGHT, {
      fill: MOTHAColors.UV_COLOR
    } );

    const wavelengths = [ ...PhotonAbsorptionModel.instance.getUVWavelengths(), PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH ];

    // Wavelengths are remapped to compress the UV spectrum. This is a brute-force, hardcoded approach because we
    // needed custom iterative control of the position of each tick mark on the x-axis. All possible wavelengths are
    // included in this map, even when their values are not remapped. This made it easier to adjust the map iteratively,
    // and easier to validate for possible programming errors.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/48#issuecomment-2568401842.
    const wavelengthMap = new Map<number, number>( [
      [ 94, 94 ],
      [ 95, 95 ],
      [ 97, 97 ],
      [ 103, 100 ],
      [ 122, 105 ],
      [ 150, 112 ]
    ] );

    super( dataPointsProperty, ModelsOfTheHydrogenAtomStrings.uvStringProperty, combineOptions<EmissionChartOptions>( {
      xAxis: xAxis,
      wavelengths: wavelengths,
      minWavelength: wavelengthMap.get( _.min( wavelengths )! )! - 1,
      maxWavelength: wavelengthMap.get( _.max( wavelengths )! )! + 1,
      wavelengthMap: wavelengthMap
    }, providedOptions ) );
  }
}

/**
 * IRChartSegment is the segment of the spectrometer chart that shows photons emitted in the IR (infrared) spectrum.
 */
class IRChartSegment extends SpectrometerChartSegment {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const xAxis = new Rectangle( 0, 0, axisLength, SpectrometerChartSegment.X_AXIS_HEIGHT, {
      fill: MOTHAColors.IR_COLOR
    } );

    const wavelengths = PhotonAbsorptionModel.instance.getIRWavelengths();

    // The comment about wavelengthMap in UVChartSegment applies here.
    const wavelengthMap = new Map<number, number>( [
      [ 1094, 1094 ],
      [ 1282, 1282 ],
      [ 1876, 1650 ],
      [ 2626, 2200 ],
      [ 4052, 3000 ],
      [ 7460, 4000 ]
    ] );

    super( dataPointsProperty, ModelsOfTheHydrogenAtomStrings.irStringProperty, combineOptions<EmissionChartOptions>( {
      xAxis: xAxis,
      wavelengths: wavelengths,
      minWavelength: 900,
      maxWavelength: wavelengthMap.get( 7460 )! + 200,
      wavelengthMap: wavelengthMap
    }, providedOptions ) );
  }
}

/**
 * VisibleChartSegment is the segement of the spectrometer chart that shows photons emitted in the visible spectrum.
 */
class VisibleChartSegment extends SpectrometerChartSegment {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>,
                      axisLength: number,
                      providedOptions?: StrictOmit<EmissionChartOptions, 'wavelengths' | 'minWavelength' | 'maxWavelength' | 'xAxis'> ) {

    const wavelengths = PhotonAbsorptionModel.instance.getVisibleWavelengths();
    const minWavelength = VisibleColor.MIN_WAVELENGTH;
    const maxWavelength = _.max( wavelengths )! + 50;

    const xAxis = new SpectrumNode( {
      size: new Dimension2( axisLength, SpectrometerChartSegment.X_AXIS_HEIGHT ),
      minValue: minWavelength,
      maxValue: maxWavelength,
      valueToColor: LightSource.wavelengthToColor
    } );

    super( dataPointsProperty, ModelsOfTheHydrogenAtomStrings.visibleStringProperty, combineOptions<EmissionChartOptions>( {
      xAxis: xAxis,
      wavelengths: wavelengths,
      minWavelength: minWavelength,
      maxWavelength: maxWavelength
    }, providedOptions ) );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerChartSegment', SpectrometerChartSegment );
export { UVChartSegment, IRChartSegment, VisibleChartSegment };