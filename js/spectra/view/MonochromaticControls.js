// Copyright 2015-2016, University of Colorado Boulder

/**
 * Controls for the monochromatic light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var SpectraModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/model/SpectraModel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );

  // strings
  var showAbsorptionWavelengthsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/showAbsorptionWavelengths' );

  /**
   * @param {Property.<string>} modelProperty
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param options
   * @constructor
   */
  function MonochromaticControls( modelProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

    options = _.extend( {
      align: 'center',
      spacing: 10
    }, options );

    // wavelength slider
    var wavelengthSlider = new WavelengthSlider( wavelengthProperty, {
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

    // 'Show absorption wavelengths' check box
    var showLabel = new Text( showAbsorptionWavelengthsString, {
      font: new MOTHAFont( 14 ),
      fill: 'white',
      maxWidth: 0.85 * wavelengthSlider.width
    } );
    var showCheckBox = new CheckBox( showLabel, absorptionWavelengthsVisibleProperty, {
      checkBoxColor: 'white',
      checkBoxColorBackground: 'black'
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      wavelengthSlider,
      showCheckBox
    ];

    VBox.call( this, options );

    modelProperty.link( function( model ) {
      showCheckBox.visible = _.contains( SpectraModel.MODELS_WITH_TRANSITION_WAVELENGTHS, model );
    } );

    var updateAbsorptionWavelengths = function() {
      //TODO wavelengthSlider.absorptionWavelengthsVisible = absorptionWavelengthsVisibleProperty.get() && _.contains( SpectraModel.MODELS_WITH_TRANSITION_WAVELENGTHS, modelProperty.get() );
    };
    modelProperty.link( updateAbsorptionWavelengths );
    absorptionWavelengthsVisibleProperty.link( updateAbsorptionWavelengths );
  }

  modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );

  return inherit( VBox, MonochromaticControls );
} );
