// Copyright 2022-2025, University of Colorado Boulder

/**
 * ClassicalSolarSystemNode displays the "Classical Solar System" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import classicalSolarSystemExplosion_png from '../../../images/classicalSolarSystemExplosion_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ClassicalSolarSystemModel from '../model/ClassicalSolarSystemModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';

export default class ClassicalSolarSystemNode extends HydrogenAtomNode {

  public constructor( classicalSolarSystemModel: ClassicalSolarSystemModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    const protonNode = new ProtonNode( classicalSolarSystemModel.proton, modelViewTransform, {
      visibleProperty: DerivedProperty.not( classicalSolarSystemModel.isDestroyedProperty )
    } );

    const electronNode = new ElectronNode( classicalSolarSystemModel.electron, modelViewTransform, {
      visibleProperty: DerivedProperty.not( classicalSolarSystemModel.isDestroyedProperty )
    } );

    const explosionNode = new Image( classicalSolarSystemExplosion_png, {
      visibleProperty: classicalSolarSystemModel.isDestroyedProperty,
      scale: 0.5,
      center: protonNode.center
    } );

    super( classicalSolarSystemModel, hydrogenAtomProperty, {
      children: [ explosionNode, protonNode, electronNode ]
    } );
  }

  /**
   * Creates the icon that represents this atomic model in the user interface.
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