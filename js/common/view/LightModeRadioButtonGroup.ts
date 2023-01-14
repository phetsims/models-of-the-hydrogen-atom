// Copyright 2016-2023, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * LightModeRadioButtonGroup provides radio buttons for selecting between monochromatic and full spectrum (white) light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Color, Node, NodeTranslationOptions, Rectangle } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type LightModeRadioButtonGroupOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<RectangularRadioButtonGroupOptions, 'tandem'>;

export default class LightModeRadioButtonGroup extends RectangularRadioButtonGroup<LightMode> {

  public constructor( lightModeProperty: Property<LightMode>, providedOptions: LightModeRadioButtonGroupOptions ) {

    const options = optionize<LightModeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'vertical',
      spacing: 8,
      radioButtonOptions: {
        xMargin: 15,
        yMargin: 6,
        baseColor: MOTHAColors.lightModeRadioButtonFillProperty,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2,
          deselectedLineWidth: 2,
          selectedStroke: MOTHAColors.lightModeRadioButtonSelectedStrokeProperty,
          deselectedStroke: MOTHAColors.lightModeRadioButtonDeselectedStrokeProperty,
          overFill: MOTHAColors.lightModeRadioButtonFillProperty,
          overStroke: MOTHAColors.lightModeRadioButtonDeselectedStrokeProperty
        }
      }
    }, providedOptions );

    super( lightModeProperty, [
      { value: 'white', createNode: () => createModeIcon( Color.white ), tandemName: 'whiteRadioButton' },
      { value: 'monochromatic', createNode: () => createModeIcon( Color.red ), tandemName: 'monochromaticRadioButton' }
    ], options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * Creates an icon for a light mode.
 */
function createModeIcon( beamColor: Color ): Node {

  const laserNode = new LaserPointerNode( new BooleanProperty( true ), {
    hasButton: false,
    rotation: -Math.PI / 2, // pointing up
    bodySize: new Dimension2( 18, 17 ), // height x width (due to rotation)
    nozzleSize: new Dimension2( 5, 13 ), // height x width (due to rotation)
    cornerRadius: 2,
    lineWidth: 0.5,
    pickable: false,
    tandem: Tandem.OPT_OUT // opt out because this is a non-interactive icon
  } );

  // If the beam color is the same as the radio button fill, stroke the beam.
  const strokeProperty = new DerivedProperty( [ MOTHAColors.lightModeRadioButtonFillProperty ],
    lightModeRadioButtonFill => ( lightModeRadioButtonFill.equals( beamColor ) ) ? 'black' : 'transparent'
  );

  const beamNode = new Rectangle( 0, 0, 5, 10, {
    fill: beamColor,
    stroke: strokeProperty,
    lineWidth: 0.5,
    centerX: laserNode.centerX,
    bottom: laserNode.top + 1
  } );

  return new Node( { children: [ beamNode, laserNode ] } );
}

modelsOfTheHydrogenAtom.register( 'LightModeRadioButtonGroup', LightModeRadioButtonGroup );