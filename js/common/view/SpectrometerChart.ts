// Copyright 2024, University of Colorado Boulder

//TODO Needs layout work. We're just getting lucky that the height of the bars works for the height of the chart.
/**
 * SpectrometerChart plots the number of photons for each emission wavelength, across the UV, visible, and IR spectrums.
 * The x-axis is wavelength, while the y-axis is number of photons.  This chart is used in the 'Spectrum' accordion
 * box, and in the snapshots dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { IREmissionChart, UVEmissionChart, VisibleEmissionChart } from './EmissionChart.js';
import SpectrometerDebugText from './SpectrometerDebugText.js';
import SpectrometerDataPoint from '../model/SpectrometerDataPoint.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

const UV_AXIS_LENGTH = 270;
const VISIBLE_AXIS_LENGTH = 145;
const IR_AXIS_LENGTH = 225;

const X_MARGIN = 5;
const X_SPACING = 14;

type SelfOptions = {
  displayHeight?: number;

  // Whether to create tick marks at emission wavelengths. Used to omit tick marks from snapshots.
  hasTickMarks?: boolean;
};

type SpectrometerNodeOptions = SelfOptions;

export default class SpectrometerChart extends Node {

  public constructor( dataPointsProperty: TReadOnlyProperty<SpectrometerDataPoint[]>, providedOptions?: SpectrometerNodeOptions ) {

    const options = optionize<SpectrometerNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      displayHeight: 135,
      hasTickMarks: true
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

    const charts = new Node( {
      children: [ uvEmissionChart, visibleEmissionChart, irEmissionChart ]
    } );

    const backgroundNode = new Rectangle( 0, 0, charts.width + 2 * X_MARGIN, options.displayHeight, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    charts.centerX = backgroundNode.centerX;
    charts.bottom = backgroundNode.bottom - 5;

    // NodeOptions
    options.children = [ backgroundNode, charts ];

    super( options );

    // A simple text-only display of the spectrometer data, for debugging.
    if ( MOTHAQueryParameters.debugSpectrometerData ) {
      const dataText = new SpectrometerDebugText( dataPointsProperty );
      dataText.localBoundsProperty.link( () => {
        dataText.right = backgroundNode.right - 5;
        dataText.top = backgroundNode.top + 5;
      } );
      this.addChild( dataText );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerChart', SpectrometerChart );