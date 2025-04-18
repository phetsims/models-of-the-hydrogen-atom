// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerEnergyDiagram is the Electron Energy Level diagram for the Schrödinger model.
 *
 * This was SchrodingerEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import PhotonAbsorptionModel from '../../common/model/PhotonAbsorptionModel.js';
import QuantumElectron from '../../common/model/QuantumElectron.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import SchrodingerQuantumNumbers from '../../common/model/SchrodingerQuantumNumbers.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import MOTHASymbols from '../../common/MOTHASymbols.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';
import { BohrEnergyDiagramOptions } from './BohrEnergyDiagram.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ElectronStateText from '../../common/view/ElectronStateText.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';

const LABEL_FONT = EnergyDiagram.LABEL_FONT;
const LEVEL_LINE_LENGTH = EnergyDiagram.LEVEL_LINE_LENGTH;
const LEVEL_LINE_X_SPACING = 4;

type SelfOptions = EmptySelfOptions;

type SchrodingerEnergyDiagramOptions = SelfOptions & StrictOmit<EnergyDiagramOptions, 'createLevelNode'>;

export default class SchrodingerEnergyDiagram extends EnergyDiagram {

  public constructor( schrodingerModel: SchrodingerModel, providedOptions: SchrodingerEnergyDiagramOptions ) {

    const options = optionize<BohrEnergyDiagramOptions, SelfOptions, EnergyDiagramOptions>()( {

      // EnergyDiagramOptions
      createLevelNode: n => createLevelNode( n )
    }, providedOptions );

    super( options );
    assert && assert( this.levelNodes.bounds.isFinite() );

    // l =
    const lEqualsStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsStringProperty, {
      symbol: MOTHASymbols.lStringProperty
    } );
    const lEqualsText = new RichText( lEqualsStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 14,
      right: this.levelNodes.left - 3,
      bottom: this.levelNodes.top - 5
    } );
    this.stateLayer.addChild( lEqualsText );

    // l values, centered above each level line
    for ( let l = 0; l < QuantumElectron.MAX_STATE; l++ ) {
      const lText = new Text( l, {
        font: LABEL_FONT,
        fill: MOTHAColors.invertibleTextFillProperty,
        maxWidth: 8,
        centerX: this.getXForState( l ),
        bottom: lEqualsText.bottom
      } );
      this.stateLayer.addChild( lText );
    }

    // 'm = {value}' in the upper right corner of the diagram.
    const mEqualsValueStringProperty = new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.symbolEqualsValueStringProperty, {
      symbol: MOTHASymbols.mStringProperty,
      value: new DerivedProperty( [ schrodingerModel.nlmProperty ], nlm => nlm.m )
    } );
    const mEqualsValueText = new RichText( mEqualsValueStringProperty, {
      font: LABEL_FONT,
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: EnergyDiagram.LABEL_MAX_WIDTH,
      top: this.energyAxisHBox.top
    } );
    mEqualsValueText.localBoundsProperty.link( () => {
      mEqualsValueText.right = this.backgroundRectangle.right - 10;
    } );
    this.stateLayer.addChild( mEqualsValueText );

    // Position the electron on the level line, based on the values of n and l.
    schrodingerModel.nlmProperty.link( ( nlmNew, nlmOld ) => {
      const xPrevious = this.electronNode.centerX;
      const yPrevious = this.electronNode.bottom;

      // Move electron to new level line.
      this.electronNode.centerX = this.getXForState( nlmNew.l );
      this.electronNode.bottom = this.getYForState( nlmNew.n );

      if ( !nlmOld || isSettingPhetioStateProperty.value || schrodingerModel.isResetting() ) {

        // Hide the energy squiggle in situations where it is incorrect to show the transition.
        this.hideEnergySquiggle();
      }
      else {
        
        // Draw the energy squiggle between the previous and current electron states.
        this.setEnergySquiggle( xPrevious, yPrevious, this.electronNode.centerX, this.electronNode.bottom,
          PhotonAbsorptionModel.instance.getTransitionWavelength( nlmOld.n, nlmNew.n ) );
      }
    } );

    // When PhET-iO state has been set, the transition is likely to be invalid, so hide the squiggle.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/164.
    phetioStateSetEmitter.addListener( () => this.hideEnergySquiggle() );
  }

  /**
   * Gets the x-coordinate, relative to this Node, that corresponds to the quantum number l that describes
   * the electron's state.
   */
  private getXForState( l: number ): number {
    assert && assert( l >= 0 && l < QuantumElectron.MAX_STATE, `invalid l: ${l}` );
    return this.levelNodes.left + LEVEL_LINE_LENGTH / 2 + ( l * ( LEVEL_LINE_LENGTH + LEVEL_LINE_X_SPACING ) );
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists n-1 horizontal lines with label "n = {value}" to the right of the lines.
 */
function createLevelNode( n: number ): Node {
  assert && assert( SchrodingerQuantumNumbers.isValid_n( n ), `invalid n: ${n}` );

  // Create the same number of lines for all levels, so that the "n = {n}" labels will be horizontally aligned.
  // Only the lines that are relevant will be visible.
  const lines: Node[] = [];
  for ( let l = 0; l < QuantumElectron.MAX_STATE; l++ ) {
    const line = new Line( 0, 0, LEVEL_LINE_LENGTH, 0, {
      lineWidth: 1,
      stroke: MOTHAColors.invertibleTextFillProperty,
      visible: ( l < n )
    } );
    lines.push( line );
  }
  const linesHBox = new HBox( {
    excludeInvisibleChildrenFromBounds: false,
    children: lines,
    spacing: LEVEL_LINE_X_SPACING
  } );

  const nEqualsValueText = new ElectronStateText( new Property( n ), {
    font: EnergyDiagram.LABEL_FONT,
    maxWidth: EnergyDiagram.LABEL_MAX_WIDTH,
    tandem: Tandem.OPT_OUT
  } );

  return new HBox( {
    children: [ linesHBox, nEqualsValueText ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerEnergyDiagram', SchrodingerEnergyDiagram );