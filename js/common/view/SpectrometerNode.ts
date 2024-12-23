// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerNode is the spectrometer that is displayed in SpectrometerAccordionBox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import UnderConstructionText from './UnderConstructionText.js';
import { IRAxisNode, UVAxisNode, VisibleAxisNode } from './WavelengthAxisNode.js';

const DISPLAY_HEIGHT = 135;
const X_MARGIN = 5;

type SelfOptions = EmptySelfOptions;

type SpectrometerNodeOptions = SelfOptions;

export default class SpectrometerNode extends Node {

  public constructor( spectrometer: Spectrometer, providedOptions?: SpectrometerNodeOptions ) {

    const uvAxisNode = new UVAxisNode( 325 );
    const visibleAxisNode = new VisibleAxisNode( 145 );
    const irAxisNode = new IRAxisNode( 250 );

    const xAxisNode = new HBox( {
      children: [ uvAxisNode, visibleAxisNode, irAxisNode ],
      spacing: 10,
      align: 'top'
    } );

    const backgroundNode = new Rectangle( 0, 0, xAxisNode.width + 2 * X_MARGIN, DISPLAY_HEIGHT, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    xAxisNode.centerX = backgroundNode.centerX;
    xAxisNode.bottom = backgroundNode.bottom - 3;

    //TODO Under Construction
    const underConstructionText = new UnderConstructionText( {
      centerX: backgroundNode.centerX,
      top: backgroundNode.top + 10
    } );

    const stringProperty = new DerivedStringProperty( [ spectrometer.dataPointsProperty ],
      dataPoints => {
        let string = '';
        dataPoints.forEach( dataPoint => {
          string += `${dataPoint.wavelength}:${dataPoint.numberOfPhotonsEmitted} `;
        } );
        return string;
      } );

    //TODO simple display of the spectrometer data, for debugging
    const dataText = new Text( stringProperty, {
      font: new PhetFont( 12 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 0.95 * backgroundNode.width
    } );
    dataText.localBoundsProperty.link( () => {
      dataText.centerX = underConstructionText.centerX;
      dataText.top = underConstructionText.bottom + 5;
    } );

    const options = optionize<SpectrometerNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      children: [ backgroundNode, xAxisNode, dataText, underConstructionText ]
    }, providedOptions );

    super( options );
  }
}

//TODO Delete these functions if unused.

// We will be scaling the x-axis for wavelengths in the UV and IR range.
// const UV_SCALED_LENGTH = 150; // nm
// const IR_SCALED_LENGTH = 150; // nm
// const SCALED_WAVELENGTH_RANGE = new Range( VisibleColor.MIN_WAVELENGTH - UV_SCALED_LENGTH, VisibleColor.MAX_WAVELENGTH + IR_SCALED_LENGTH );

// /**
//  * Scales wavelengths in the UV portion of the spectrum, so that we can compress that part of the x-axis.
//  */
// function scaleUV( wavelength: number ): number {
//   assert && assert( wavelength < VisibleColor.MIN_WAVELENGTH, `invalid UV wavelength: ${wavelength}` );
//   return Utils.linear(
//     MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.min, VisibleColor.MIN_WAVELENGTH,
//     SCALED_WAVELENGTH_RANGE.min, VisibleColor.MIN_WAVELENGTH,
//     wavelength );
// }
//
// /**
//  * Scales wavelengths in the IR portion of the spectrum, so that we can compress that part of the x-axis.
//  */
// function scaleIR( wavelength: number ): number {
//   assert && assert( wavelength > VisibleColor.MAX_WAVELENGTH, `invalid IR wavelength: ${wavelength}` );
//   return Utils.linear(
//     VisibleColor.MAX_WAVELENGTH, MOTHAConstants.SPECTROMETER_WAVELENGTH_RANGE.max,
//     VisibleColor.MAX_WAVELENGTH, SCALED_WAVELENGTH_RANGE.max,
//     wavelength );
// }

modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );