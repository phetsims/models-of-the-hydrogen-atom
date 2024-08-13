// Copyright 2024, University of Colorado Boulder

/**
 * ExperimentNode is shown when the AB switch is set to 'Experiment'.  It displays a '?' that covers the space
 * where the hydrogen atom would be shown.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, NodeOptions, NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import MOTHAColors from '../MOTHAColors.js';
import { ModelMode } from '../model/ModelMode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type ExperimentNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ExperimentNode extends Node {

  public constructor( modelModeProperty: TReadOnlyProperty<ModelMode>, providedOptions: ExperimentNodeOptions ) {

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
      visibleProperty: new DerivedProperty( [ modelModeProperty ], modelMode => ( modelMode === 'experiment' ), {
        phetioValueType: BooleanIO,
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' )
      } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentNode', ExperimentNode );