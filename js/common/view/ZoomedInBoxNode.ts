// Copyright 2015-2022, University of Colorado Boulder

/**
 * ZoomedInBoxNode is a base class that provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms and photons takes place.
 * Subclasses are expected to add views of specific hydrogen-atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, NodeTranslationOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {};

export type ZoomedInBoxNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ZoomedInBoxNode extends Node {

  public constructor( zoomBox: ZoomedInBox, modelViewTransform: ModelViewTransform2, providedOptions: ZoomedInBoxNodeOptions ) {

    const options = optionize<ZoomedInBoxNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO
    }, providedOptions );

    const outlineNode = new Rectangle( modelViewTransform.modelToViewBounds( zoomBox ), {
      fill: MOTHAColors.boxFillProperty,
      stroke: MOTHAColors.boxStrokeProperty,
      lineWidth: 1
    } );

    options.children = [ outlineNode ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomedInBoxNode', ZoomedInBoxNode );