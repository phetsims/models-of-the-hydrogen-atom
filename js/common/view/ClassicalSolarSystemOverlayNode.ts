// Copyright 2025, University of Colorado Boulder

/**
 * ClassicalSolarSystemOverlayNode displays user-interface elements (controls and displays) related to the
 * Classical Solar System model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ClassicalSolarSystemModel from '../model/ClassicalSolarSystemModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';

export default class ClassicalSolarSystemOverlayNode extends Node {

  public constructor( classicalSolarSystemModel: ClassicalSolarSystemModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBoxBounds: Bounds2,
                      tandem: Tandem ) {

    const resetButton = new ResetButton( {
      listener: () => classicalSolarSystemModel.reset(),
      radius: 16,
      rightBottom: zoomedInBoxBounds.rightBottom.minusXY( 10, 10 ),
      touchAreaDilation: 6,
      enabledProperty: classicalSolarSystemModel.isDestroyedProperty,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.resetAtomButton.accessibleNameStringProperty,
      tandem: tandem.createTandem( 'resetButton' )
    } );

    super( {
      children: [ resetButton ],
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === classicalSolarSystemModel ),
      tandem: tandem,
      phetioDocumentation: 'Overlay for user-interface elements in front of the Classical Solar System atom.'
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemOverlayNode', ClassicalSolarSystemOverlayNode );