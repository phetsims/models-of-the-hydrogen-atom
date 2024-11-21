// Copyright 2022-2024, University of Colorado Boulder

/**
 * Wireframe3DNode displays a 3D wireframe model. This was Wireframe3DNode.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3DModel from './Wireframe3DModel.js';

type SelfOptions = EmptySelfOptions;

type WireframeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class Wireframe3DNode extends Node {

  private readonly model: Wireframe3DModel;

  public constructor( model: Wireframe3DModel, providedOptions?: WireframeNodeOptions ) {

    const options = optionize<WireframeNodeOptions, SelfOptions, RectangleOptions>()( {
      //TODO

      // RectangleOptions
      isDisposable: false
    }, providedOptions );

    super( options );

    this.model = model;
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3DNode', Wireframe3DNode );