// Copyright 2024, University of Colorado Boulder

/**
 * AbsorptionAndEmissionDialog is a non-modal dialog that displays information about absorption/emission wavelengths
 * and state transitions, and contains controls for setting wavelengths for the Light.
 *
 * @deprecated - PhET needs a non-modal dialog.
 * Since PhET does not have support for non-modal Dialogs, we fake a non-modal Dialog using a Panel.
 * See https://github.com/phetsims/sun/issues/916 and https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { combineOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CloseButton from '../../../../scenery-phet/js/buttons/CloseButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import { AlignGroup, Color, GridBox, HBox, HSeparator, HSeparatorOptions, KeyboardListener, Node, PDOMPeer, Rectangle, Text, TextOptions, VBox, VStrut } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { LightMode } from '../model/LightMode.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHASymbols from '../MOTHASymbols.js';
import PhotonNode from './PhotonNode.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';

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

type AbsorptionAndEmissionDialogOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class AbsorptionAndEmissionDialog extends Panel {

  // Position of the panel's top-left corner.
  private readonly positionProperty: Property<Vector2>;

  public constructor( monochromaticWavelengthProperty: NumberProperty,
                      lightModeProperty: Property<LightMode>,
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      providedOptions: AbsorptionAndEmissionDialogOptions ) {

    const options = optionize4<AbsorptionAndEmissionDialogOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // SelfOptions
      position: new Vector2( 0, 0 ),

      // PanelOptions
      isDisposable: false,
      cursor: 'pointer',
      tagName: 'div', // for KeyboardDragListener
      focusable: true, // for KeyboardDragListener
      groupFocusHighlight: true,
      tandemNameSuffix: 'Dialog' // Yes it's a Panel, but we are OK with calling it a Dialog.
    }, providedOptions );

    const transitionColumnVisibleProperty = DerivedProperty.not( isExperimentProperty );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.absorptionAndEmissionStringProperty, TITLE_TEXT_OPTIONS );

    const closeButton = new CloseButton( {
      iconLength: 10,
      listener: () => {
        providedOptions.visibleProperty.value = false;
      },
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      tandem: options.tandem.createTandem( 'closeButton' )
    } );

    // Since we're faking a non-modal Dialog using a Panel, we need to handle description that would be handled
    // by common code for a non-modal Dialog, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
    // The accessible name and help text should be inside the dialog content. This content needs to come after the
    // "Close" button in the order, and it needs to be a child of the content so that it can be found when the user
    // reads down through the dialog.
    const pdomNode = new Node( {
      tagName: 'div',
      labelTagName: 'h3',
      descriptionTagName: 'p',
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.absorptionAndEmissionDialog.accessibleNameStringProperty,
      descriptionContent: ModelsOfTheHydrogenAtomStrings.a11y.absorptionAndEmissionDialog.helpTextStringProperty
    } );

    const titleBarNode = new HBox( {
      spacing: 10,
      children: [ titleText, closeButton, pdomNode ],

      // The pdomNode needs to come after the close button.
      pdomOrder: [ titleText, closeButton, pdomNode ]
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

    // Create a row for each transition wavelength, ordered by increasing wavelength.
    let n1Previous = 1;
    const wavelengths = photonAbsorptionModel.getWavelengths().sort( ( a, b ) => a - b );
    wavelengths.forEach( wavelength => {

      // 'wavelength' column.
      // For wavelengths that can be set via monochromaticWavelengthProperty, use a push button. Otherwise, use Text.
      const wavelengthText = wavelengthTextAlignGroup.createBox( new Text( wavelength, CONTENT_TEXT_OPTIONS ) );
      let waveLengthNode: Node;
      if ( monochromaticWavelengthProperty.range.contains( wavelength ) ) {
        waveLengthNode = new RectangularPushButton( {
          baseColor: MOTHAColors.pushButtonBaseColorProperty,
          content: wavelengthText,
          listener: () => {
            monochromaticWavelengthProperty.value = wavelength;
            lightModeProperty.value = 'monochromatic';
          },
          accessibleName: new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.a11y.wavelengthButton.accessibleNameStringProperty, {
            wavelength: wavelength
          } ),
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

      // 'n transition' column
      const transition = photonAbsorptionModel.getTransition( wavelength )!;
      assert && assert( transition );
      const transitionText = new Text( `${transition.n1} ${MOTHASymbols.leftRightArrow} ${transition.n2}`, combineOptions<TextOptions>( {
        visibleProperty: transitionColumnVisibleProperty
      }, CONTENT_TEXT_OPTIONS ) );

      // Add a row, with an additional blank row when n changes.
      if ( transition.n1 !== n1Previous ) {
        n1Previous = transition.n1;
        rows.push( [ new VStrut( ySpacing ), new VStrut( ySpacing ) ] );
      }
      rows.push( [ photonAndWavelengthNode, transitionText ] );
    } );

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

    // pdom - Set the aria-labelledby relation so that whenever focus enters the dialog, the accessibleName is read.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
    this.addAriaLabelledbyAssociation( {
      thisElementName: PDOMPeer.PRIMARY_SIBLING,
      otherElementName: PDOMPeer.LABEL_SIBLING,
      otherNode: pdomNode
    } );

    // pdom - Required for the aria-labelledby association to work in NVDA, see
    // https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
    this.ariaRole = 'dialog';

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

modelsOfTheHydrogenAtom.register( 'AbsorptionAndEmissionDialog', AbsorptionAndEmissionDialog );