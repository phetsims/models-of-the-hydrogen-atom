// Copyright 2015-2022, University of Colorado Boulder

/**
 * NeutronNode is the visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 11;

type SelfOptions = {};

type NeutronNodeOptions = SelfOptions & Omit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class NeutronNode extends ShadedSphereNode {

  constructor( providedOptions?: NeutronNodeOptions ) {

    const options = optionize<NeutronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: 'rgb( 128, 128, 128 )',
      highlightColor: 'rgb( 175, 175, 175 )'
    }, providedOptions );

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );