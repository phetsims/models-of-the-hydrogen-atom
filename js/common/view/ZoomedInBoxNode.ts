// Copyright 2015-2022, University of Colorado Boulder

/**
 * ZoomedInBoxNode is a base class that provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms and photons takes place.
 * Subclasses are expected to add views of specific hydrogen-atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, NodeTranslationOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptyObjectType;

export type ZoomedInBoxNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ZoomedInBoxNode extends Node {

  // Subclasses should add things that are "inside" the box to this Node.
  protected readonly contentsNode: Node;

  protected constructor( zoomBox: ZoomedInBox, modelViewTransform: ModelViewTransform2, providedOptions: ZoomedInBoxNodeOptions ) {

    const options = optionize<ZoomedInBoxNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO
    }, providedOptions );

    const backgroundNode = new Rectangle( modelViewTransform.modelToViewBounds( zoomBox ), {
      fill: MOTHAColors.boxFillProperty
    } );

    const outlineNode = new Rectangle( modelViewTransform.modelToViewBounds( zoomBox ), {
      stroke: MOTHAColors.boxStrokeProperty,
      lineWidth: 3
    } );

    const contentsNode = new Node( {

      // Clip contents to the bounds of the box.
      clipArea: modelViewTransform.modelToViewShape( Shape.rectangle( zoomBox.minX, zoomBox.minY, zoomBox.width, zoomBox.height ) )
    } );

    options.children = [ backgroundNode, contentsNode, outlineNode ];

    super( options );

    this.contentsNode = contentsNode;
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBoxNode', ZoomedInBoxNode );