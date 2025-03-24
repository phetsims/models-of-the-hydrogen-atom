// Copyright 2024-2025, University of Colorado Boulder

/**
 * ExperimentNode is shown when the A/B switch is set to 'Experiment'.  It displays a '?' that covers the space
 * where the hydrogen atom would be shown.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import { ModelOrExperiment } from '../model/MOTHAModel.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHAColors from '../MOTHAColors.js';
import SchrodingerStateText from './SchrodingerStateText.js';

type SelfOptions = EmptySelfOptions;

type ExperimentNodeOptions = SelfOptions & NodeTranslationOptions;

export default class ExperimentNode extends Node {

  public constructor( modelOrExperimentProperty: TReadOnlyProperty<ModelOrExperiment>,
                      nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      providedOptions?: ExperimentNodeOptions ) {

    const questionMarkText = new Text( ModelsOfTheHydrogenAtomStrings.questionMarkStringProperty, {
      font: new PhetFont( 72 ),
      fill: MOTHAColors.invertibleTextFillProperty,
      maxWidth: 60
    } );

    const squareLength = 1.5 * Math.max( questionMarkText.width, questionMarkText.height );

    const square = new Rectangle( 0, 0, squareLength, squareLength, {
      fill: MOTHAColors.zoomedInBoxFillProperty,
      stroke: MOTHAColors.zoomedInBoxStrokeProperty
    } );

    questionMarkText.localBoundsProperty.link( () => {
      questionMarkText.center = square.center;
    } );

    const options = optionize<ExperimentNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      children: [ square, questionMarkText ],
      visibleProperty: new DerivedProperty( [ modelOrExperimentProperty ], modelOrExperiment => modelOrExperiment === 'experiment' )
    }, providedOptions );

    super( options );

    // (n,l,m) = ... in the bottom third of the zoomed-in box, for debugging ExperimentOopsDialog.
    if ( phet.chipper.queryParameters.dev ) {
      const electronStateText = new SchrodingerStateText( nlmProperty, Tandem.OPT_OUT );
      electronStateText.fill = 'red';
      const electronStateTextCenterTop = square.centerBottom.plusXY( 0, 100 );
      electronStateText.localBoundsProperty.link( () => {
        electronStateText.centerTop = electronStateTextCenterTop;
      } );
      this.addChild( electronStateText );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentNode', ExperimentNode );