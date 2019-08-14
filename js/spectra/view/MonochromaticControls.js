// Copyright 2016-2019, University of Colorado Boulder

/**
 * Controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ModelModes = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ModelModes' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );

  // strings
  const showAbsorptionWavelengthsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/showAbsorptionWavelengths' );

  class MonochromaticControls extends VBox {

    /**
     * @param {EnumerationProperty.<ModelMode>} modelModeProperty
     * @param {EnumerationProperty.<PredictiveModels>} predictiveModelProperty
     * @param {Property.<number>} wavelengthProperty
     * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
     * @param {Object} [options]
     */
    constructor( modelModeProperty, predictiveModelProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

      options = _.extend( {
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
      options.children = [
        wavelengthSlider,
        showCheckbox
      ];

      super( options );

      // transition wavelengths are relevant only to certain models
      const hasTransitionWavelengths = () => {
        return modelModeProperty.value === ModelModes.EXPERIMENT ||
               _.includes( SpectraModel.PREDICTIVE_MODELS_WITH_TRANSITION_WAVELENGTHS, predictiveModelProperty.value );
      };

      // show the checkbox only if it's relevant
      const updateCheckboxVisible = () => {
        showCheckbox.visible = hasTransitionWavelengths();
      };
      modelModeProperty.link( updateCheckboxVisible );
      predictiveModelProperty.link( updateCheckboxVisible );

      // show absorption wavelengths for relevant models
      const updateAbsorptionWavelengths = () => {
        //TODO
        // wavelengthSlider.absorptionWavelengthsVisible = hasTransitionWavelengths() && absorptionWavelengthsVisibleProperty.value;
      };
      predictiveModelProperty.link( updateAbsorptionWavelengths );
      absorptionWavelengthsVisibleProperty.link( updateAbsorptionWavelengths );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );
} );
