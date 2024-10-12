// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionEmissionDialog is a non-modal dialog that displays information about absorption/emission wavelengths
 * and state transitions, and contains controls for setting wavelengths for the Light.
 *
 * Since PhET does not have support for non-modal Dialogs, we fake a dialog using a Panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { combineOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { AlignGroup, Color, GridBox, HBox, HSeparator, HSeparatorOptions, KeyboardListener, Node, Rectangle, Text, TextOptions, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BohrModel from '../model/BohrModel.js';
import PhotonNode from './PhotonNode.js';
import MOTHAColors from '../MOTHAColors.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import MOTHAConstants from '../MOTHAConstants.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import CloseButton from '../../../../scenery-phet/js/buttons/CloseButton.js';
import { LightMode } from '../model/LightMode.js';

const TITLE_TEXT_OPTIONS = {
  font: new PhetFont( {
    size: 16,
    weight: 'bold'
  } ),
  maxWidth: 200
};

const HEADING_TEXT_OPTIONS = {
  font: new PhetFont( {
    size: 12,
    weight: 'bold'
  } ),
  maxWidth: 100
};

const SEPARATOR_OPTIONS = {
  stroke: Color.grayColor( 200 )
};

const CONTENT_TEXT_OPTIONS = {
  font: new PhetFont( 12 )
};

type SelfOptions = {
  position?: Vector2; // initial position, in view coordinates
  visibleProperty: Property<boolean>; // our visibleProperty needs to be writable
};

type AbsorptionEmissionDialogOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class AbsorptionEmissionDialog extends Panel {

  // Position of the panel's top-left corner.
  private readonly positionProperty: Property<Vector2>;

  public constructor( monochromaticWavelengthProperty: NumberProperty,
                      lightModeProperty: Property<LightMode>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      providedOptions: AbsorptionEmissionDialogOptions ) {

    const options = optionize4<AbsorptionEmissionDialogOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // SelfOptions
      position: Vector2.ZERO,

      // PanelOptions
      isDisposable: false,
      cursor: 'pointer',
      tagName: 'div', // for KeyboardDragListener
      focusable: true, // for KeyboardDragListener
      groupFocusHighlight: true,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.absorptionEmissionDialogStringProperty,
      helpText: ModelsOfTheHydrogenAtomStrings.a11y.absorptionEmissionDialogHelpTextStringProperty,
      tandemNameSuffix: 'Dialog' // Yes it's a Panel, but we are OK with calling it a Dialog.
    }, providedOptions );

    const transitionColumnVisibleProperty = DerivedProperty.not( isExperimentProperty );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.absorptionEmissionStringProperty, TITLE_TEXT_OPTIONS );

    const closeButton = new CloseButton( {
      iconLength: 10,
      listener: () => {
        providedOptions.visibleProperty.value = false;
      },
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      tandem: options.tandem.createTandem( 'closeButton' )
    } );

    //TODO Maybe make titleBarNode look like the accordion box titles in RPAL?
    const titleBarNode = new HBox( {
      spacing: 10,
      children: [ titleText, closeButton ]
    } );

    // Headings for the columns
    const columnHeadings = [
      new Text( ModelsOfTheHydrogenAtomStrings.wavelengthNanometersStringProperty, HEADING_TEXT_OPTIONS ),
      new Text( ModelsOfTheHydrogenAtomStrings.nTransitionStringProperty, combineOptions<TextOptions>( {
        visibleProperty: transitionColumnVisibleProperty
      }, HEADING_TEXT_OPTIONS ) )
    ];

    // Separators below the column headings
    const columnSeparators = [
      new HSeparator( SEPARATOR_OPTIONS ),
      new HSeparator( combineOptions<HSeparatorOptions>( {
        visibleProperty: transitionColumnVisibleProperty
      }, SEPARATOR_OPTIONS ) )
    ];

    const rows: Node[][] = [
      columnHeadings,
      columnSeparators
    ];

    const ySpacing = 5;
    rows.push( [
      new Rectangle( 0, 0, 1, ySpacing ),
      new Rectangle( 0, 0, 1, ySpacing )
    ] );

    // So that these Nodes have the same effective size.
    const wavelengthTextAlignGroup = new AlignGroup();
    const wavelengthNodeAlignGroup = new AlignGroup();

    // Group all buttons.
    const buttonGroupTandem = options.tandem.createTandem( 'buttonGroup' );

    //TODO Don't assume that wavelengthToStateTransitionMap is sorted by ascending wavelength.
    let n1Previous = 1;
    for ( const [ wavelength, transition ] of BohrModel.wavelengthToStateTransitionMap ) {

      const wavelengthText = wavelengthTextAlignGroup.createBox( new Text( wavelength, CONTENT_TEXT_OPTIONS ) );

      // For wavelengths that can be set via monochromaticWavelengthProperty, use a push button. Otherwise, use Text.
      let waveLengthNode: Node;
      if ( monochromaticWavelengthProperty.range.contains( wavelength ) ) {
        waveLengthNode = new RectangularPushButton( {
          baseColor: MOTHAColors.pushButtonBaseColorProperty,
          content: wavelengthText,
          listener: () => {
            monochromaticWavelengthProperty.value = wavelength;
            lightModeProperty.value = 'monochromatic';
          },
          tandem: buttonGroupTandem.createTandem( `wavelength${wavelength}Button` ),
          phetioVisiblePropertyInstrumented: false
        } );
      }
      else {
        waveLengthNode = wavelengthText;
      }

      const photonAndWavelengthNode = new HBox( {
        spacing: 10,
        children: [
          PhotonNode.createIcon( wavelength, 0.75 ),
          wavelengthNodeAlignGroup.createBox( waveLengthNode )
        ]
      } );

      if ( transition.n1 !== n1Previous ) {
        n1Previous = transition.n1;
        rows.push( [
          new Rectangle( 0, 0, 1, ySpacing ),
          new Rectangle( 0, 0, 1, ySpacing )
        ] );
      }

      rows.push( [
        photonAndWavelengthNode,
        new Text( `${transition.n1} ${MOTHASymbols.leftRightArrow} ${transition.n2}`, combineOptions<TextOptions>( {
          visibleProperty: transitionColumnVisibleProperty
        }, CONTENT_TEXT_OPTIONS ) )
      ] );
    }

    const gridBox = new GridBox( {
      rows: rows,
      xSpacing: 15,
      ySpacing: 4
    } );

    const content = new VBox( {
      spacing: 10,
      align: 'center',
      children: [
        titleBarNode,
        gridBox
      ]
    } );

    super( content, options );

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' )
    } );

    this.positionProperty.link( position => {
      this.translation = position;
    } );

    // Keep the entire panel inside the visible bounds of the ScreenView.
    const dragBoundsProperty = new DerivedProperty(
      [ visibleBoundsProperty, this.boundsProperty ],
      ( visibleBounds, bounds ) => new Bounds2(
        visibleBounds.minX + MOTHAConstants.SCREEN_VIEW_X_MARGIN,
        visibleBounds.minY + MOTHAConstants.SCREEN_VIEW_Y_MARGIN,
        visibleBounds.maxX - MOTHAConstants.SCREEN_VIEW_X_MARGIN - bounds.width,
        visibleBounds.maxY - MOTHAConstants.SCREEN_VIEW_Y_MARGIN - bounds.height ), {
        valueComparisonStrategy: 'equalsFunction'
      } );

    // Keep the position inside of drag bounds.
    dragBoundsProperty.lazyLink( dragBounds => {
      if ( !isSettingPhetioStateProperty.value ) {
        if ( !dragBounds.containsPoint( this.positionProperty.value ) ) {
          this.positionProperty.value = dragBounds.closestBoundaryPointTo( this.positionProperty.value );
        }
      }
    } );

    const dragListener = new SoundDragListener( {
      positionProperty: this.positionProperty,
      dragBoundsProperty: dragBoundsProperty,
      useParentOffset: true,
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( dragListener );

    const keyboardDragListener = new SoundKeyboardDragListener( {
      positionProperty: this.positionProperty,
      dragBoundsProperty: dragBoundsProperty,
      dragSpeed: 600,
      shiftDragSpeed: 150,
      tandem: options.tandem.createTandem( 'keyboardDragListener' )
    } );
    this.addInputListener( keyboardDragListener );

    // Hide the panel when the "escape" key is pressed.
    const keyboardListener = new KeyboardListener( {
      keys: [ 'escape', 'tab', 'shift+tab' ],
      fire: ( event, keysPressed ) => {
        if ( keysPressed === 'escape' ) {
          providedOptions.visibleProperty.value = false;
        }
      }
    } );
    this.addInputListener( keyboardListener );
  }

  public reset(): void {
    this.positionProperty.reset();
  }

  public setInitialPosition( position: Vector2 ): void {
    this.positionProperty.value = position;
    this.positionProperty.setInitialValue( position );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionEmissionDialog', AbsorptionEmissionDialog );