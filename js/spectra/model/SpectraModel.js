// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const StringProperty = require( 'AXON/StringProperty' );

  // valid values for the modelName property
  const MODEL_NAMES = [
    'billiardBall',
    'plumPudding',
    'classicalSolarSystem',
    'bohr',
    'deBroglie',
    'schrodinger'
  ];

  // models that include the concept of transition wavelengths
  const MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS = [
    'bohr',
    'deBroglie',
    'schrodinger'
  ];
  assert && assert( MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS.length === _.intersection( MODEL_NAMES, MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS ).length,
    'bad model name in MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS' );

  /**
   * @constructor
   */
  function SpectraModel() {

    // @public {string} name of the predictive model being used
    this.modelNameProperty = new StringProperty( 'classicalSolarSystem', {
      validValues: MODEL_NAMES
    } );

    // @public
    this.light = new Light();
  }

  modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );

  return inherit( Object, SpectraModel, {

    // @public @override
    reset: function() {
      this.modelNameProperty.reset();
      this.light.reset();
    },

    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  }, {

    MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS: MODEL_NAMES_WITH_TRANSITION_WAVELENGTHS
  } );
} );