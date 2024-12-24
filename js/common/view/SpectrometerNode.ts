// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerNode is the spectrometer that is displayed in SpectrometerAccordionBox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { IREmissionChart, UVEmissionChart, VisibleEmissionChart } from './EmissionChart.js';
import SpectrometerDebugText from './SpectrometerDebugText.js';

const DISPLAY_HEIGHT = 135;
const X_MARGIN = 5;

type SelfOptions = EmptySelfOptions;

type SpectrometerNodeOptions = SelfOptions;

export default class SpectrometerNode extends Node {

  public constructor( spectrometer: Spectrometer, providedOptions?: SpectrometerNodeOptions ) {

    // Photon emission charts for three spectrums, each with a different scale, so that values do not overlap.
    const uvEmissionChart = new UVEmissionChart( spectrometer.dataPointsProperty, 400 );
    const visibleEmissionChart = new VisibleEmissionChart( spectrometer.dataPointsProperty, 145 );
    const irEmissionChart = new IREmissionChart( spectrometer.dataPointsProperty, 275 );

    visibleEmissionChart.left = uvEmissionChart.right + 10;
    irEmissionChart.left = visibleEmissionChart.right + 10;

    const charts = new Node( {
      children: [ uvEmissionChart, visibleEmissionChart, irEmissionChart ]
    } );

    const backgroundNode = new Rectangle( 0, 0, charts.width + 2 * X_MARGIN, DISPLAY_HEIGHT, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    charts.centerX = backgroundNode.centerX;
    charts.bottom = backgroundNode.bottom - 5;

    const options = optionize<SpectrometerNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      children: [ backgroundNode, charts ]
    }, providedOptions );

    super( options );

    // A simple text-only display of the spectrometer data, for debugging.
    if ( phet.chipper.queryParameters.dev ) {
      const dataText = new SpectrometerDebugText( spectrometer.dataPointsProperty );
      dataText.localBoundsProperty.link( () => {
        dataText.right = backgroundNode.right - 5;
        dataText.top = backgroundNode.top + 5;
      } );
      this.addChild( dataText );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );