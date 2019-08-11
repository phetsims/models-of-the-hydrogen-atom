// Copyright 2015-2019, University of Colorado Boulder

/**
 * The spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const MOTHAConstants = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAConstants' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const RecordStopButton = require( 'SCENERY_PHET/buttons/RecordStopButton' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const ResetButton = require( 'SCENERY_PHET/buttons/ResetButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const photonsEmittedNmString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/photonsEmittedNm' );
  const spectrometerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/spectrometer' );

  // constants
  const BUTTON_COLOR = 'rgb( 245, 245, 245 )';
  const DISPLAY_SIZE = new Dimension2( 510, 130 );

  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Property.<number>} numberOfSnapshotsProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpectrometerNode( expandedProperty, numberOfSnapshotsProperty, options ) {

    options = _.extend( {
      fill: 'rgb( 80, 80, 80 )',
      stroke: 'rgb( 140, 140, 140 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 8,
      buttonYMargin: 5,
      contentXMargin: 10,
      contentYMargin: 5,
      contentYSpacing: 0,
      buttonAlign: 'right',
      titleAlignX: 'left',
      expandCollapseButtonOptions: {
        sideLength: 22,
        touchAreaXDilation: 10,
        touchAreaYDilation: 10
      }
    }, options );

    options.expandedProperty = expandedProperty;

    const titleNode = new Text( spectrometerString, {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.titleFillProperty
    } );

    //TODO order of title and subtitle is not localized
    const subtitleNode = new Text( photonsEmittedNmString, {
      font: new MOTHAFont( 14 ),
      fill: 'white'
    } );

    // show subtitle only when expanded
    expandedProperty.link( function( expanded ) {
      subtitleNode.visible = expanded;
    } );

    assert && assert( !options.titleNode );
    options.titleNode = new HBox( {
      align: 'bottom',
      spacing: 12,
      children: [ titleNode, subtitleNode ],
      maxWidth: 290 // i18n, determined empirically
    } );

    //TODO placeholder
    const displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      cornerRadius: options.cornerRadius,
      fill: 'black'
    } );

    //TODO relocate, handle reset
    const recordingProperty = new BooleanProperty( false );
    recordingProperty.link( function( recording ) {
      //TODO
    } );

    const recordStopButton = new RecordStopButton( recordingProperty, {
      radius: 15,
      baseColor: BUTTON_COLOR,
      touchAreaDilation: 5
    } );

    const resetButton = new ResetButton( {
      baseColor: BUTTON_COLOR,
      arrowColor: 'black',
      radius: recordStopButton.height / 2,
      touchAreaDilation: 5,
      listener: function() {
        //TODO
      }
    } );

    const snapshotButton = new RectangularPushButton( {
      maxHeight: recordStopButton.height,
      baseColor: BUTTON_COLOR,
      content: new FontAwesomeNode( 'camera' ),
      touchAreaXDilation: 10,
      touchAreaYDilation: 5,
      listener: function() {
        const numberOfScreenshots = Math.min( MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS, numberOfSnapshotsProperty.get() + 1 );
        numberOfSnapshotsProperty.set( numberOfScreenshots );
      }
    } );

    const buttonGroup = new VBox( {
      spacing: 10,
      align: 'center',
      children: [ recordStopButton, resetButton, snapshotButton ]
    } );

    const contentNode = new HBox( {
      spacing: 12,
      align: 'bottom',
      children: [ displayNode, buttonGroup ]
    } );

    AccordionBox.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );

  return inherit( AccordionBox, SpectrometerNode );
} );
