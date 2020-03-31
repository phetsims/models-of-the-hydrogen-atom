// Copyright 2016-2020, University of Colorado Boulder

/**
 * MonochromaticControls provides controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import WavelengthSlider from '../../../../scenery-phet/js/WavelengthSlider.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

const showAbsorptionWavelengthsString = modelsOfTheHydrogenAtomStrings.showAbsorptionWavelengths;

class MonochromaticControls extends VBox {

  /**
   * @param {Property.<boolean>} experimentEnabledProperty
   * @param {Property.<PredictiveModel>} predictiveModelProperty
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param {Object} [options]
   */
  constructor( experimentEnabledProperty, predictiveModelProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

    options = merge( {
      align: 'center',
      spacing: 10
    }, options );

    // wavelength slider
    const wavelengthSlider = new WavelengthSlider( wavelengthProperty, {
      trackWidth: 250,
      trackHeight: 20,
      thumbTouchAreaXDilation: 12,
      thumbTouchAreaYDilation: 0,
      maxTweakersHeight: 20,
      thumbWidth: 25,
      thumbHeight: 25,
      valueYSpacing: 6,
      valueFill: 'white',
      valueFont: new PhetFont( 16 )
    } );

    // 'Show absorption wavelengths' checkbox
    const showLabel = new Text( showAbsorptionWavelengthsString, {
      font: new PhetFont( 14 ),
      fill: MOTHAColorProfile.showAbsorptionWavelengthTextFillProperty,
      maxWidth: 0.85 * wavelengthSlider.width
    } );
    const showCheckbox = new Checkbox( showLabel, absorptionWavelengthsVisibleProperty, {
      checkboxColor: MOTHAColorProfile.showAbsorptionWavelengthCheckboxStrokeProperty,
      checkboxColorBackground: MOTHAColorProfile.showAbsorptionWavelengthCheckboxFillProperty
    } );

    assert && assert( !options.children, 'MonochromaticControls sets children' );
    options.children = [ wavelengthSlider, showCheckbox ];

    super( options );

    // show the checkbox only if it's relevant
    Property.multilink(
      [ experimentEnabledProperty, predictiveModelProperty ],
      ( experimentEnabled, predictiveModel ) => {
        showCheckbox.visible = ( experimentEnabled || predictiveModel.hasTransitionWavelengths );
      } );

    // show absorption wavelengths for relevant models
    Property.multilink(
      [ predictiveModelProperty, absorptionWavelengthsVisibleProperty ],
      ( predictiveModel, absorptionWavelengthsVisible ) => {
        //TODO
        // wavelengthSlider.absorptionWavelengthsVisible = predictiveModel.hasTransitionWavelengths && absorptionWavelengthsVisible;
      } );
  }
}

modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );
export default MonochromaticControls;