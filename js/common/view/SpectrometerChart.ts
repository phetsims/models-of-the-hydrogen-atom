// Copyright 2024-2025, University of Colorado Boulder

/**
 * SpectrometerChart plots the number of photons for each emission wavelength, across the UV, visible, and IR spectrums.
 * The x-axis is wavelength, while the y-axis is number of photons.  This chart is used in the Spectrometer accordion
 * box, and in the snapshots dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectrometerDataPoint from '../model/SpectrometerDataPoint.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import EmissionChart, { IREmissionChart, UVEmissionChart, VisibleEmissionChart } from './EmissionChart.js';

// Lengths of the 3 x-axis (nm) segments
const UV_AXIS_LENGTH = 270;
const VISIBLE_AXIS_LENGTH = 145;
const IR_AXIS_LENGTH = 235;

const X_MARGIN = 5;
const X_SPACING = 8;

type SelfOptions = {

  // Height of the chart. Must be set empirically using ?debugSpectrometer, so that the data fits in backgroundNode.
  chartHeight: number;

  // Whether to create tick marks at emission wavelengths. Used to omit tick marks from snapshots.
  hasTickMarks?: boolean;

  // Fill and stroke for the chart background.
  backgroundFill?: TColor;
  backgroundStroke?: TColor;
};

type SpectrometerChartOptions = SelfOptions;

export default class SpectrometerChart extends Node {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>, providedOptions: SpectrometerChartOptions ) {

    const options = optionize<SpectrometerChartOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      hasTickMarks: true,
      backgroundFill: MOTHAColors.spectrometerFillProperty,
      backgroundStroke: MOTHAColors.spectrometerStrokeProperty
    }, providedOptions );


    // Photon emission charts for three spectrums, each with a different scale, so that values do not overlap.
    const chartOptions = {
      hasTickMarks: options.hasTickMarks
    };
    const uvEmissionChart = new UVEmissionChart( dataPointsProperty, UV_AXIS_LENGTH, chartOptions );
    const visibleEmissionChart = new VisibleEmissionChart( dataPointsProperty, VISIBLE_AXIS_LENGTH, chartOptions );
    const irEmissionChart = new IREmissionChart( dataPointsProperty, IR_AXIS_LENGTH, chartOptions );

    visibleEmissionChart.left = uvEmissionChart.right + X_SPACING;
    irEmissionChart.left = visibleEmissionChart.right + X_SPACING;

    // Breaks between the segments of the x-axis.
    const breakNodesCenterY = uvEmissionChart.y + EmissionChart.X_AXIS_HEIGHT / 2;
    const uvRightBreakNode = new AxisBreakNode( {
      centerX: uvEmissionChart.right,
      centerY: breakNodesCenterY
    } );
    const visibleLeftBreakNode = new AxisBreakNode( {
      centerX: visibleEmissionChart.left,
      centerY: breakNodesCenterY
    } );
    const visibleRightBreakNode = new AxisBreakNode( {
      centerX: visibleEmissionChart.right,
      centerY: breakNodesCenterY
    } );
    const irLeftBreakNode = new AxisBreakNode( {
      centerX: irEmissionChart.left,
      centerY: breakNodesCenterY
    } );

    const charts = new Node( {
      children: [ uvEmissionChart, visibleEmissionChart, irEmissionChart, uvRightBreakNode, visibleLeftBreakNode, visibleRightBreakNode, irLeftBreakNode ]
    } );

    const backgroundNode = new Rectangle( 0, 0, charts.width + 2 * X_MARGIN, options.chartHeight, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: options.backgroundFill,
      stroke: options.backgroundStroke
    } );

    charts.centerX = backgroundNode.centerX;
    charts.bottom = backgroundNode.bottom - 5;

    options.children = [ backgroundNode, charts ];

    super( options );
  }
}

/**
 * AxisBreakNode denotes a break at the end of an x-axis segment. It looks like '/'.
 */
class AxisBreakNode extends Line {
  public constructor( providedOptions?: NodeTranslationOptions ) {
    super( 3, 0, 0, 16, combineOptions<LineOptions>( {
      stroke: MOTHAColors.invertibleTextFillProperty
    }, providedOptions ) );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerChart', SpectrometerChart );