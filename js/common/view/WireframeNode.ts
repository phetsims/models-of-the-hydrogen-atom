// Copyright 2022-2023, University of Colorado Boulder

/**
 * WireframeNode displays a 3D wireframe model. This was Wireframe3DNode.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import WireframeModel from './WireframeModel.js';

type SelfOptions = EmptySelfOptions;

type WireframeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class WireframeNode extends Node {

  private readonly model: WireframeModel;

  public constructor( model: WireframeModel, providedOptions?: WireframeNodeOptions ) {

    const options = optionize<WireframeNodeOptions, SelfOptions, RectangleOptions>()( {
      //TODO

      // RectangleOptions
      isDisposable: false
    }, providedOptions );

    super( options );

    this.model = model;
  }
}

modelsOfTheHydrogenAtom.register( 'WireframeNode', WireframeNode );