// Copyright 2024, University of Colorado Boulder

//TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/31 Support 'Absorption Wavelengths', 'Emission Wavelengths', and 'Absorption/Emission Wavelengths'
/**
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { AlignGroup, Color, GridBox, HBox, HSeparator, Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BohrModel from '../model/BohrModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhotonNode from './PhotonNode.js';
import MOTHAColors from '../MOTHAColors.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

const HEADING_TEXT_OPTIONS = {
  font: new PhetFont( {
    size: 12,
    weight: 'bold'
  } ),
  maxWidth: 150
};

const TEXT_OPTIONS = {
  font: new PhetFont( 12 )
};

type SelfOptions = {
  position?: Vector2; // initial position, in view coordinates
};

type AbsorptionWavelengthsDialogOptions = SelfOptions & PickRequired<PanelOptions, 'tandem' | 'visibleProperty'>;

export default class AbsorptionWavelengthsPanel extends Panel {

  // Position of the panel's top-left corner.
  private readonly positionProperty: Property<Vector2>;

  public constructor( monochromaticWavelengthProperty: NumberProperty,
                      layoutBounds: Bounds2,
                      providedOptions: AbsorptionWavelengthsDialogOptions ) {

    const options = optionize<AbsorptionWavelengthsDialogOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      position: Vector2.ZERO,

      // PanelOptions
      isDisposable: false,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    const titleText = new Text( 'Absorption Wavelengths', { //TODO i18n
      font: new PhetFont( {
        size: 16,
        weight: 'bold'
      } )
    } );

    // Headings for the columns
    const columnHeadings = [
      new Text( ModelsOfTheHydrogenAtomStrings.wavelengthNanometersStringProperty, HEADING_TEXT_OPTIONS ),
      new Text( ModelsOfTheHydrogenAtomStrings.nTransitionStringProperty, HEADING_TEXT_OPTIONS )
    ];

    // Separators below the column headings
    const hSeparatorOptions = {
      stroke: Color.grayColor( 200 )
    };
    const columnSeparators = [
      new HSeparator( hSeparatorOptions ),
      new HSeparator( hSeparatorOptions )
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

    let n1Previous = 1;
    for ( const [ wavelength, transition ] of BohrModel.wavelengthToStateTransitionMap ) {

      const wavelengthText = wavelengthTextAlignGroup.createBox( new Text( wavelength, TEXT_OPTIONS ) );

      // For wavelengths that can be set via monochromaticWavelengthProperty, use a push button. Otherwise, use Text.
      let waveLengthNode: Node;
      if ( monochromaticWavelengthProperty.range.contains( wavelength ) ) {
        waveLengthNode = new RectangularPushButton( {
          baseColor: MOTHAColors.pushButtonBaseColorProperty,
          content: wavelengthText,
          listener: () => {
            monochromaticWavelengthProperty.value = wavelength;
          },
          tandem: Tandem.OPT_OUT
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
        new Text( `${transition.n1} ${MOTHASymbols.rightArrow} ${transition.n2}`, TEXT_OPTIONS )
      ] );
    }

    const gridBox = new GridBox( {
      rows: rows,
      xSpacing: 15,
      ySpacing: 4
    } );

    const content = new VBox( {
      spacing: 10,
      children: [
        titleText,
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
  }

  public reset(): void {
    this.positionProperty.reset();
  }

  public setInitialPosition( position: Vector2 ): void {
    this.positionProperty.value = position;
    this.positionProperty.setInitialValue( position );
  }
}

modelsOfTheHydrogenAtom.register( 'AbsorptionWavelengthsPanel', AbsorptionWavelengthsPanel );