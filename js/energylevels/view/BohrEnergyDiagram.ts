// Copyright 2024-2025, University of Colorado Boulder

/**
 * BohrEnergyDiagram is the Electron Energy Level diagram for the Bohr model.
 *
 * This was BohrEnergyDiagram.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import BohrModel from '../../common/model/BohrModel.js';
import PhotonAbsorptionModel from '../../common/model/PhotonAbsorptionModel.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyDiagram, { EnergyDiagramOptions } from './EnergyDiagram.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ElectronStateText from '../../common/view/ElectronStateText.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';

type SelfOptions = EmptySelfOptions;

export type BohrEnergyDiagramOptions = SelfOptions & StrictOmit<EnergyDiagramOptions, 'createLevelNode'>;

export default class BohrEnergyDiagram extends EnergyDiagram {

  public constructor( bohrModel: BohrModel, providedOptions: BohrEnergyDiagramOptions ) {

    const options = optionize<BohrEnergyDiagramOptions, SelfOptions, EnergyDiagramOptions>()( {

      // EnergyDiagramOptions
      createLevelNode: n => createLevelNode( n )
    }, providedOptions );

    super( options );

    // Position the electron on a level line, based on the value of n.
    bohrModel.electron.nProperty.link( ( nNew, nOld ) => {

      // Previous electron position.
      const xPrevious = this.electronNode.centerX;
      const yPrevious = this.electronNode.bottom;

      // New electron position.
      const x = this.stateLayer.left + EnergyDiagram.LEVEL_LINE_LENGTH / 2;
      const y = this.getYForState( nNew );

      // Move electron to new level line.
      this.electronNode.centerX = x;
      this.electronNode.bottom = y;

      if ( !nOld || isSettingPhetioStateProperty.value || bohrModel.isResetting() ) {

        // Hide the energy squiggle in situations where the state transition is invalid.
        this.hideEnergySquiggle();
      }
      else {

        // Hide the energy squiggle in situations where it is incorrect to show the transition.
        this.setEnergySquiggle( xPrevious, yPrevious, x, y, PhotonAbsorptionModel.instance.getTransitionWavelength( nOld, nNew ) );
      }
    } );

    // When the atomic model is reset, hide the energy squiggle.
    // This is needed in addition to the isResetting() check above because resetting may not fire nProperty's listener.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/166.
    bohrModel.resetEmitter.addListener( () => this.hideEnergySquiggle() );
    
    // When PhET-iO state has been set, the transition is likely to be invalid, so hide the squiggle.
    // This is needed in addition to the isResetting() check above because setting state may not fire nProperty's listener.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/164.
    phetioStateSetEmitter.addListener( () => this.hideEnergySquiggle() );
  }
}

/**
 * Creates a Node for the level that corresponds to an electron state (n).
 * This Node consists of a horizontal line with label "n = {value}" to the right of the line.
 */
function createLevelNode( n: number ): Node {

  const line = new Line( 0, 0, EnergyDiagram.LEVEL_LINE_LENGTH, 0, {
    lineWidth: 1,
    stroke: MOTHAColors.invertibleTextFillProperty
  } );

  const nEqualsValueText = new ElectronStateText( new Property( n ), {
    font: EnergyDiagram.LABEL_FONT,
    maxWidth: EnergyDiagram.LABEL_MAX_WIDTH,
    tandem: Tandem.OPT_OUT
  } );

  return new HBox( {
    children: [ line, nEqualsValueText ],
    align: 'center',
    spacing: 5
  } );
}

modelsOfTheHydrogenAtom.register( 'BohrEnergyDiagram', BohrEnergyDiagram );