// Copyright 2025, University of Colorado Boulder

/**
 * DeBroglie2DWaveNode is the base class for the 'Radial Distance' and 'Brightness' views of the de Broglie model.
 * These views represent the electron as a 2D wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';

export default class DeBroglie2DWaveNode extends Node {

  protected constructor( deBroglieModel: DeBroglieModel,
                         modelViewTransform: ModelViewTransform2,
                         thisDeBroglieRepresentation: DeBroglieRepresentation,
                         waveNode: Node ) {

    // Electron orbits
    const orbitsNode = new OrbitsNode( deBroglieModel.position, modelViewTransform );

    super( {
      isDisposable: false,
      children: [ orbitsNode, waveNode ],
      visibleProperty: new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
        deBroglieRepresentation => ( deBroglieRepresentation === thisDeBroglieRepresentation ) )
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglie2DWaveNode', DeBroglie2DWaveNode );