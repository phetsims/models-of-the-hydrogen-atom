// Copyright 2024-2025, University of Colorado Boulder

/**
 * TransitionsDialog is a non-modal dialog that displays information about absorption/emission wavelengths
 * and state transitions, and contains controls for setting wavelengths for the LightSource.
 *
 * Since PhET does not have support for non-modal Dialogs, we are faking a non-modal Dialog using a Panel, including the PhET-iO API.
 * See https://github.com/phetsims/sun/issues/916 and https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
 *
 * @deprecated - PhET needs a non-modal dialog.
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
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CloseButton from '../../../../scenery-phet/js/buttons/CloseButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import PDOMPeer from '../../../../scenery/js/accessibility/pdom/PDOMPeer.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import GridBox from '../../../../scenery/js/layout/nodes/GridBox.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator, { HSeparatorOptions } from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import Color from '../../../../scenery/js/util/Color.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { LightMode } from '../model/LightMode.js';
import { ModelOrExperiment } from '../model/MOTHAModel.js';
import PhotonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHASymbols from '../MOTHASymbols.js';
import MOTHAScreenView from './MOTHAScreenView.js';
import PhotonNode from './PhotonNode.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';

const TITLE_TEXT_OPTIONS: TextOptions = {
  font: new PhetFont( {
    size: 16,
    weight: 'bold'
  } ),
  maxWidth: 150
};

const HEADING_TEXT_OPTIONS: TextOptions = {
  font: new PhetFont( {
    size: 12,
    weight: 'bold'
  } ),
  maxWidth: 95
};

const SEPARATOR_OPTIONS: HSeparatorOptions = {
  stroke: Color.grayColor( 200 )
};

const CONTENT_TEXT_OPTIONS: TextOptions = {
  font: new PhetFont( 12 )
};

const MARGINS = 10;

type SelfOptions = {
  position?: Vector2; // the dialog's initial position, in view coordinates
};

type TransitionsDialogOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class TransitionsDialog extends InteractiveHighlighting( Panel ) {

  // Position of the panel's top-left corner.
  private readonly positionProperty: Property<Vector2>;

  public constructor( monochromaticWavelengthProperty: NumberProperty,
                      lightModeProperty: Property<LightMode>,
                      modelOrExperimentProperty: TReadOnlyProperty<ModelOrExperiment>,
                      isQuantumAtomProperty: TReadOnlyProperty<boolean>,
                      visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
                      providedOptions: TransitionsDialogOptions ) {

    const options = optionize<TransitionsDialogOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),

      // PanelOptions
      isDisposable: false,
      visible: false,
      cursor: 'pointer',
      xMargin: MARGINS,
      yMargin: MARGINS,
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      tagName: 'div',
      focusable: true,
      groupFocusHighlight: true,
      tandemNameSuffix: 'Dialog', // Yes it's a Panel, but we are OK with calling it a Dialog.
      visiblePropertyOptions: {
        phetioFeatured: true,
        phetioReadOnly: true
      }
    }, providedOptions );

    const transitionColumnVisibleProperty = new DerivedProperty( [ modelOrExperimentProperty ],
      modelOrExperiment => modelOrExperiment === 'model' );

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.transitionsStringProperty, TITLE_TEXT_OPTIONS );

    const closeButton = new CloseButton( {
      iconLength: 10,
      listener: () => this.hide(),
      mouseAreaXDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      mouseAreaYDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      touchAreaXDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      touchAreaYDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      tandem: options.tandem.createTandem( 'closeButton' ),
      phetioEnabledPropertyInstrumented: false, // like Dialog
      visiblePropertyOptions: {
        phetioFeatured: true // see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/139
      }
    } );

    // Since we're faking a non-modal Dialog using a Panel, we need to handle description that would be handled
    // by common code for a non-modal Dialog, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/86.
    // The accessible name and help text should be inside the dialog content. This content needs to come after the
    // "Close" button in the order, and it needs to be a child of the content so that it can be found when the user
    // reads down through the dialog.
    const pdomNode = new Node( {
      accessibleHeading: ModelsOfTheHydrogenAtomStrings.a11y.transitionsDialog.accessibleNameStringProperty,
      accessibleParagraph: ModelsOfTheHydrogenAtomStrings.a11y.transitionsDialog.accessibleHelpTextStringProperty
    } );

    const titleBarNode = new HBox( {
      layoutOptions: {
        stretch: true
      },
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
    const wavelengths = PhotonAbsorptionModel.instance.getWavelengths().sort( ( a, b ) => a - b );
    wavelengths.forEach( wavelength => {

      // 'wavelength' column.
      // For wavelengths that can be set via monochromaticWavelengthProperty, use a push button. Otherwise, use Text.
      const wavelengthText = wavelengthTextAlignGroup.createBox( new Text( wavelength, CONTENT_TEXT_OPTIONS ) );
      let waveLengthNode: Node;
      if ( monochromaticWavelengthProperty.range.contains( wavelength ) ) {
        waveLengthNode = new RectangularPushButton( {
          baseColor: MOTHAColors.pushButtonColorProperty,
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
      const transition = PhotonAbsorptionModel.instance.getTransition( wavelength )!;
      assert && assert( transition, `no transition found for wavelength ${wavelength}` );
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

    // Hide the Transitions dialog when we switch to a classical model, because the concept of electron state
    // transition is relevant only for quantum models.
    isQuantumAtomProperty.link( isQuantumAtom => {
      if ( !isSettingPhetioStateProperty.value && !isQuantumAtom ) {
        this.hide();
      }
    } );

    // Keep the entire panel inside the visible bounds of the ScreenView.
    const dragBoundsProperty = new DerivedProperty(
      [ visibleBoundsProperty, this.boundsProperty ],
      ( visibleBounds, bounds ) => new Bounds2(
        visibleBounds.minX + MOTHAScreenView.X_MARGIN,
        visibleBounds.minY + MOTHAScreenView.Y_MARGIN,
        visibleBounds.maxX - MOTHAScreenView.X_MARGIN - bounds.width,
        visibleBounds.maxY - MOTHAScreenView.Y_MARGIN - bounds.height ), {
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
          this.hide();
        }
      }
    } );
    this.addInputListener( keyboardListener );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.hide();
  }

  /**
   * Sets the initial position of this dialog. This is used after the ScreenView layout has been finalized,
   * and we can therefore position the dialog.
   */
  public setInitialPosition( position: Vector2 ): void {
    this.positionProperty.value = position;
    this.positionProperty.setInitialValue( position );
  }

  public show(): void {
    this.visibleProperty.value = true;
  }

  public hide(): void {
    this.visibleProperty.value = false;
  }
}

modelsOfTheHydrogenAtom.register( 'TransitionsDialog', TransitionsDialog );