// Copyright 2016, University of Colorado Boulder

/**
 * 'Energy Levels' screen
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Screen = require( 'JOIST/Screen' );
  var EnergyLevelsModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/model/EnergyLevelsModel' );
  var EnergyLevelsScreenView = require( 'MODELS_OF_THE_HYDROGEN_ATOM/energylevels/view/EnergyLevelsScreenView' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screenEnergyLevelsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/screen.energyLevels' );

  /**
   * @constructor
   */
  function EnergyLevelsScreen() {

    Screen.call( this,
      screenEnergyLevelsString,
      new ScreenIcon( new Text( '' ), { fill: 'lightBlue' } ), //TODO icon
      function() { return new EnergyLevelsModel(); },
      function( model ) { return new EnergyLevelsScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );

  return inherit( Screen, EnergyLevelsScreen );
} );