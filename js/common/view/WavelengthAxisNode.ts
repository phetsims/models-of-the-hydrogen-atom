// Copyright 2024, University of Colorado Boulder

/**
 * WavelengthAxisNode is a portion of the x-axis (wavelength) displayed by the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Line, Node, NodeOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrumNode from '../../../../scenery-phet/js/SpectrumNode.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Light from '../model/Light.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';

const AXIS_HEIGHT = 4;
const TICK_LINE_LENGTH = 5;
const TICK_FONT = new PhetFont( 8 );

type SelfOptions = {
  minWavelength: number;
  maxWavelength: number;
  tickValues: number[];
  axisNode: Node;
};

type WavelengthAxisNodeOptions = SelfOptions;

export default class WavelengthAxisNode extends Node {

  protected constructor( provideOptions: WavelengthAxisNodeOptions ) {

    const options = optionize<WavelengthAxisNodeOptions, SelfOptions, NodeOptions>()( {}, provideOptions );

    const axisNode = options.axisNode;
    const axisLength = options.axisNode.width;

    const children: Node[] = [];

    options.tickValues.forEach( tickValue => {

      assert && assert( tickValue >= options.minWavelength && tickValue <= options.maxWavelength,
        `tickValue is out of range: ${tickValue}` );

      const x = Utils.linear( options.minWavelength, options.maxWavelength, 0, axisLength, tickValue );

      const tickLine = new Line( 0, 0, 0, TICK_LINE_LENGTH, {
        stroke: MOTHAColors.tickLineStrokeProperty,
        lineWidth: 1,
        centerX: axisNode.left + x,
        top: axisNode.bottom
      } );
      children.push( tickLine );

      const tickText = new Text( tickValue, {
        fill: MOTHAColors.tickTextFillProperty,
        font: TICK_FONT,
        rotation: -Math.PI / 2,
        centerX: tickLine.centerX,
        top: tickLine.bottom + 2
      } );
      children.push( tickText );
    } );

    children.push( axisNode );

    options.children = children;

    super( options );
  }
}

/**
 * UVAxisNode is the segment of the x-axis for the UV spectrum.
 */
class UVAxisNode extends WavelengthAxisNode {

  public constructor( axisLength: number ) {

    const tickValues = [ ...photonAbsorptionModel.getUVWavelengths(), PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH ];

    const axisNode = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.UV_COLOR
    } );

    super( {
      minWavelength: _.min( tickValues )! - 1,
      maxWavelength: _.max( tickValues )! + 1,
      tickValues: tickValues,
      axisNode: axisNode
    } );
  }
}

/**
 * IRAxisNode is the segment of the x-axis for the IR spectrum.
 */
class IRAxisNode extends WavelengthAxisNode {

  public constructor( axisLength: number ) {

    const tickValues = photonAbsorptionModel.getIRWavelengths();

    const axisNode = new Rectangle( 0, 0, axisLength, AXIS_HEIGHT, {
      fill: MOTHAColors.IR_COLOR
    } );

    super( {
      minWavelength: 1000,
      maxWavelength: 7500,
      tickValues: tickValues,
      axisNode: axisNode
    } );
  }
}

/**
 * VisibleAxisNode is the segment of the x-axis for the visible spectrum.
 */
class VisibleAxisNode extends WavelengthAxisNode {

  public constructor( axisLength: number ) {

    const tickValues = photonAbsorptionModel.getVisibleWavelengths();

    const axisNode = new SpectrumNode( {
      size: new Dimension2( axisLength, AXIS_HEIGHT ),
      minValue: VisibleColor.MIN_WAVELENGTH,
      maxValue: VisibleColor.MAX_WAVELENGTH,
      valueToColor: Light.wavelengthToColor
    } );

    super( {
      minWavelength: VisibleColor.MIN_WAVELENGTH,
      maxWavelength: VisibleColor.MAX_WAVELENGTH,
      tickValues: tickValues,
      axisNode: axisNode
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'WavelengthAxisNode', WavelengthAxisNode );
export { UVAxisNode, IRAxisNode, VisibleAxisNode };