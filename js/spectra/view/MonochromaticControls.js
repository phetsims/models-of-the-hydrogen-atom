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
  var Text = require( 'SCENERY/nodes/Text' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var showAbsorptionWavelengthsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/showAbsorptionWavelengths' );

  /**
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param options
   * @constructor
   */
  function MonochromaticControls( wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

    options = _.extend( {
      align: 'center',
      spacing: 10
    }, options );

    // wavelength slider
    var wavelengthSlider = new WavelengthSlider( wavelengthProperty, {
      trackWidth: 250,
      trackHeight: 20,
      maxTweakersHeight: 20,
      thumbWidth: 25,
      thumbHeight: 25,
      ySpacing: 6,
      valueFill: 'white',
      valueFont: new MOTHAFont( 18 )
    } );

    // 'Show absorption wavelengths' check box
    var showLabel = new Text( showAbsorptionWavelengthsString, {
      font: new MOTHAFont( 18 ),
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

    absorptionWavelengthsVisibleProperty.link( function( visible ) {
      //TODO
    } );
  }

  modelsOfTheHydrogenAtom.register( 'MonochromaticControls', MonochromaticControls );

  return inherit( VBox, MonochromaticControls );
} );
