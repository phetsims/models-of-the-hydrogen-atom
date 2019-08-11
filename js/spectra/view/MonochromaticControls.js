// Copyright 2016-2018, University of Colorado Boulder

/**
 * Controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );

  // strings
  const showAbsorptionWavelengthsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/showAbsorptionWavelengths' );

  /**
   * @param {Property.<string>} modeProperty
   * @param {Property.<string>} modelNameProperty
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param options
   * @constructor
   */
  function MonochromaticControls( modeProperty, modelNameProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

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
      valueFont: new MOTHAFont( 16 )
    } );

    // 'Show absorption wavelengths' checkbox
    const showLabel = new Text( showAbsorptionWavelengthsString, {
      font: new MOTHAFont( 14 ),
      fill: 'white',
      maxWidth: 0.85 * wavelengthSlider.width
    } );
    const showCheckbox = new Checkbox( showLabel, absorptionWavelengthsVisibleProperty, {
      checkboxColor: 'white',
      checkboxColorBackground: 'black'
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      wavelengthSlider,
      showCheckbox
    ];

    VBox.call( this, options );

    // transition wavelengths are relevant only to certain models
    const hasTransitionWavelengths = function() {
      return modeProperty.get() === 'experiment' ||
             _.includes( SpectraModel.MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS, modelNameProperty.get() );
    };

    // show the checkbox only if it's relevant
    const updateCheckboxVisible = function() {
      showCheckbox.visible = hasTransitionWavelengths();
    };
    modeProperty.link( updateCheckboxVisible );
    modelNameProperty.link( updateCheckboxVisible );

    // show absorption wavelengths for relevant models
    const updateAbsorptionWavelengths = function() {
      //TODO
      // wavelengthSlider.absorptionWavelengthsVisible = hasTransitionWavelengths() && absorptionWavelengthsVisibleProperty.get();
    };
    modelNameProperty.link( updateAbsorptionWavelengths );
    absorptionWavelengthsVisibleProperty.link( updateAbsorptionWavelengths );
  }

  modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );

  return inherit( VBox, MonochromaticControls );
} );
