// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerNode is the spectrometer that is displayed in SpectrometerAccordionBox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Spectrometer from '../model/Spectrometer.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAColors from '../MOTHAColors.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import SpectrumNode from '../../../../scenery-phet/js/SpectrumNode.js';
import Light from '../model/Light.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Utils from '../../../../dot/js/Utils.js';
import Range from '../../../../dot/js/Range.js';

const DISPLAY_SIZE = new Dimension2( 620, 135 );
const CHART_SIZE = new Dimension2( 0.97 * DISPLAY_SIZE.width, 0.9 * DISPLAY_SIZE.height );

// We will be scaling the x-axis for wavelengths in the UV and IR range.
const UV_SCALED_LENGTH = 150; // nm
const IR_SCALED_LENGTH = 150; // nm
const SCALED_WAVELENGTH_RANGE = new Range( VisibleColor.MIN_WAVELENGTH - UV_SCALED_LENGTH, VisibleColor.MAX_WAVELENGTH + IR_SCALED_LENGTH );

type SelfOptions = EmptySelfOptions;

type SpectrometerNodeOptions = SelfOptions;

export default class SpectrometerNode extends Node {

  public constructor( spectrometer: Spectrometer, providedOptions?: SpectrometerNodeOptions ) {

    //TODO use bamboo.ChartRectangle
    const backgroundNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    const spectrumNode = new SpectrumNode( {
      size: new Dimension2( CHART_SIZE.width, 4 ),
      minValue: scaleUV( MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.min ),
      maxValue: scaleIR( MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.max ),
      valueToColor: Light.wavelengthToColor,
      centerX: backgroundNode.centerX,
      bottom: backgroundNode.bottom - 3
    } );

    const stringProperty = new DerivedStringProperty( [ spectrometer.dataPointsProperty ],
      dataPoints => {
        let string = '';
        dataPoints.forEach( dataPoint => {
          string += `${dataPoint.wavelength}:${dataPoint.numberOfPhotonsEmitted} `;
        } );
        return string;
      } );

    //TODO simple temporary text display, for debugging
    const text = new Text( stringProperty, {
      font: new PhetFont( 12 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 0.95 * backgroundNode.width
    } );
    text.localBoundsProperty.link( () => {
      text.center = backgroundNode.center;
    } );

    const options = optionize<SpectrometerNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      children: [ backgroundNode, spectrumNode, text ]
    }, providedOptions );

    super( options );
  }
}

/**
 * Scales wavelengths in the UV portion of the spectrum, so that we can compress that part of the x-axis.
 */
function scaleUV( wavelength: number ): number {
  assert && assert( wavelength < VisibleColor.MIN_WAVELENGTH, `invalid UV wavelength: ${wavelength}` );
  return Utils.linear(
    MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.min, VisibleColor.MIN_WAVELENGTH,
    SCALED_WAVELENGTH_RANGE.min, VisibleColor.MIN_WAVELENGTH,
    wavelength );
}

/**
 * Scales wavelengths in the IR portion of the spectrum, so that we can compress that part of the x-axis.
 */
function scaleIR( wavelength: number ): number {
  assert && assert( wavelength > VisibleColor.MAX_WAVELENGTH, `invalid IR wavelength: ${wavelength}` );
  return Utils.linear(
    VisibleColor.MAX_WAVELENGTH, MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.max,
    VisibleColor.MAX_WAVELENGTH, SCALED_WAVELENGTH_RANGE.max,
    wavelength );
}

modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );