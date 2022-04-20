// Copyright 2015-2022, University of Colorado Boulder

/**
 * ZoomBoxNode provides the zoomed-in view of part of the box of hydrogen.
 * This is the box in which animation of atoms, photons and alpha particles takes place.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = {};

type ZoomBoxNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'left' | 'top'>;

//TODO extends Rectangle?
export default class ZoomBoxNode extends Node {

  constructor( providedOptions: ZoomBoxNodeOptions ) {

    const options = optionize<ZoomBoxNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO
    }, providedOptions );

    const outlineNode = new Rectangle( 0, 0, 400, 400, {
      fill: MOTHAColors.boxFillProperty,
      stroke: MOTHAColors.boxStrokeProperty,
      lineWidth: 1
    } );

    options.children = [ outlineNode ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'ZoomBoxNode', ZoomBoxNode );