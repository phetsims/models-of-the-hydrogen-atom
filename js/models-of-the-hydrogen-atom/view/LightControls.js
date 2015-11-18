// Copyright 2015, University of Colorado Boulder

/**
 * Controls for the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var monochromaticString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/monochromatic' );
  var whiteString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/white' );

  // constants
  var RADIO_BUTTON_OPTIONS = {
    radius: 10
  };
  var RADIO_BUTTON_LABEL_OPTIONS = {
    font: new MHAFont( 14 ),
    fill: 'white',
    maxWidth: 100 // i18n, determined empirically
  };
  var X_MARGIN = 12;
  var Y_MARGIN = 10;

  /**
   * @param {Property.<string>} lightModeProperty - 'white'|'monochromatic'
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param options
   * @constructor
   */
  function LightControls( lightModeProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

    options = options || {};

    // radio buttons
    var whiteButton = new AquaRadioButton( lightModeProperty, 'white',
      new Text( whiteString, RADIO_BUTTON_LABEL_OPTIONS ),
      RADIO_BUTTON_OPTIONS );
    var monochromaticButton = new AquaRadioButton( lightModeProperty, 'monochromatic',
      new Text( monochromaticString, RADIO_BUTTON_LABEL_OPTIONS ),
      RADIO_BUTTON_OPTIONS );
    var buttonGroup = new HBox( {
      spacing: 20,
      children: [ whiteButton, monochromaticButton ]
    } );

    // wavelength slider
    var wavelengthSlider = new WavelengthSlider( wavelengthProperty, {
      thumbWidth: 25,
      thumbHeight: 25,
      valueFill: 'white',
      valueFont: new MHAFont( 14 )
    } );

    var contentNode = new VBox( {
      align: 'center',
      spacing: 8,
      children: [
        buttonGroup,
        wavelengthSlider
      ]
    } );

    var backgroundNode = new ShadedRectangle(
      new Bounds2( 0, 0, contentNode.width + ( 2 * X_MARGIN ), contentNode.height + ( 2 * Y_MARGIN ) ), {
      baseColor: 'rgb( 89, 93, 186 )'
    } );

    options.children = [ backgroundNode, contentNode ];
    contentNode.center = backgroundNode.center;

    Node.call( this, options );

    // Show the wavelength slider only when in 'monochromatic' mode
    lightModeProperty.link( function( lightMode ) {
      wavelengthSlider.visible = ( lightMode === 'monochromatic' );
    } );

    wavelengthProperty.link( function( wavelength ) {
      //TODO
    } );

    absorptionWavelengthsVisibleProperty.link( function( visible ) {
      //TODO
    } );
  }

  modelsOfTheHydrogenAtom.register( 'LightControls', LightControls );

  return inherit( Node, LightControls );
} );
