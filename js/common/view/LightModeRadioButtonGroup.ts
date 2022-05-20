// Copyright 2016-2022, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * LightModeRadioButtonGroup provides radio buttons for selecting between monochromatic and full spectrum (white) light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import IProperty from '../../../../axon/js/IProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import LaserPointerNode, { LaserPointerNodeOptions } from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Color, Node, NodeTranslationOptions, Rectangle } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';

// constants
const BEAM_SIZE = new Dimension2( 5, 10 );
const LASER_POINTER_OPTIONS = {
  hasButton: false,
  rotation: -Math.PI / 2, // pointing up
  bodySize: new Dimension2( 18, 17 ), // height x width (due to rotation)
  nozzleSize: new Dimension2( 5, 13 ), // height x width (due to rotation)
  cornerRadius: 2,
  lineWidth: 0.5
};

type SelfOptions = {};

type LightModeRadioButtonGroupOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<RectangularRadioButtonGroupOptions, 'tandem'>;

export default class LightModeRadioButtonGroup extends RectangularRadioButtonGroup<LightMode> {

  constructor( lightModeProperty: IProperty<LightMode>, providedOptions: LightModeRadioButtonGroupOptions ) {

    const options = optionize<LightModeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'vertical',
      spacing: 8,
      buttonContentXMargin: 15,
      buttonContentYMargin: 6,
      baseColor: MOTHAColors.lightModeRadioButtonFillProperty,
      selectedStroke: MOTHAColors.lightModeRadioButtonSelectedStrokeProperty,
      deselectedStroke: MOTHAColors.lightModeRadioButtonDeselectedStrokeProperty,

      //TODO these options are undefined in RectangularRadioButtonGroupOptions
      // overFill: MOTHAColors.lightModeRadioButtonFillProperty,
      // overStroke: MOTHAColors.lightModeRadioButtonDeselectedStrokeProperty,

      selectedLineWidth: 2,
      deselectedLineWidth: 2
    }, providedOptions );

    super( lightModeProperty, [
      { value: 'white', node: createModeIcon( Color.white ), tandemName: 'whiteRadioButton' },
      { value: 'monochromatic', node: createModeIcon( Color.red ), tandemName: 'monochromaticRadioButton' }
    ], options );
  }
}

/**
 * Creates an icon for a light mode.
 */
function createModeIcon( beamColor: Color ): Node {

  const laserNode = new LaserPointerNode( new BooleanProperty( true ),
    combineOptions<LaserPointerNodeOptions>( {
      pickable: false,
      tandem: Tandem.OPT_OUT // opt out because this is a non-interactive icon
    }, LASER_POINTER_OPTIONS )
  );

  // If the beam color is the same as the radio button fill, stroke the beam.
  const strokeProperty = new DerivedProperty( [ MOTHAColors.lightModeRadioButtonFillProperty ],
    lightModeRadioButtonFill => ( lightModeRadioButtonFill.equals( beamColor ) ) ? 'black' : null
  );

  const beamNode = new Rectangle( 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, {
    fill: beamColor,
    stroke: strokeProperty,
    lineWidth: 0.5,
    centerX: laserNode.centerX,
    bottom: laserNode.top + 1
  } );

  return new Node( { children: [ beamNode, laserNode ] } );
}

modelsOfTheHydrogenAtom.register( 'LightModeRadioButtonGroup', LightModeRadioButtonGroup );