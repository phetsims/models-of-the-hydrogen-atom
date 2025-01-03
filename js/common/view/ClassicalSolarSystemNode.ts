// Copyright 2022-2024, University of Colorado Boulder

/**
 * ClassicalSolarSystemNode displays the "Classical Solar System" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import classicalSolarSystemExplosion_png from '../../../images/classicalSolarSystemExplosion_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ClassicalSolarSystemModel from '../model/ClassicalSolarSystemModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type ClassicalSolarSystemNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class ClassicalSolarSystemNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: ClassicalSolarSystemModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: ClassicalSolarSystemNodeOptions ) {

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      visibleProperty: DerivedProperty.not( hydrogenAtom.isDestroyedProperty )
    } );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform, {
      visibleProperty: DerivedProperty.not( hydrogenAtom.isDestroyedProperty )
    } );

    const explosionNode = new Image( classicalSolarSystemExplosion_png, {
      visibleProperty: hydrogenAtom.isDestroyedProperty,
      scale: 0.5,
      center: protonNode.center
    } );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );
    const resetButton = new ResetButton( {
      radius: 16,
      rightBottom: zoomedInBoxBounds.rightBottom.minusXY( 10, 10 ),
      listener: () => hydrogenAtom.reset(),
      enabledProperty: hydrogenAtom.isDestroyedProperty,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.resetAtomButton.accessibleNameStringProperty,
      tandem: providedOptions.tandem.createTandem( 'resetButton' )
    } );

    const options = optionize<ClassicalSolarSystemNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {

      // HydrogenAtomNodeOptions
      children: [ explosionNode, protonNode, electronNode, resetButton ]
    }, providedOptions );


    super( hydrogenAtom, hydrogenAtomProperty, options );
  }

  /**
   * Creates the icon that represents this model in the user interface.
   */
  public static createIcon(): Node {

    // Proton
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );

    // Electron
    const electronIcon = ElectronNode.createIcon();
    electronIcon.setScaleMagnitude( 0.5 );

    // Electron above and right of proton
    const electronAngle = 0.75 * Math.PI;
    const orbitRadius = 1.5 * protonIcon.height;
    electronIcon.centerX = orbitRadius * Math.sin( electronAngle );
    electronIcon.centerY = orbitRadius * Math.cos( electronAngle );

    return new Node( {
      children: [ protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemNode', ClassicalSolarSystemNode );