// Copyright 2024, University of Colorado Boulder

//TODO What happens when the Experiment gets into the metastable state? There is no 'Excite Atom' button here.
/**
 * ExperimentNode is shown when the AB switch is set to 'Experiment'.  It displays a '?' that covers the space
 * where the hydrogen atom would be shown.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ExperimentNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ExperimentNode extends Node {

  public constructor( isExperimentProperty: TReadOnlyProperty<boolean>, providedOptions: ExperimentNodeOptions ) {

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
      visibleProperty: isExperimentProperty
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentNode', ExperimentNode );