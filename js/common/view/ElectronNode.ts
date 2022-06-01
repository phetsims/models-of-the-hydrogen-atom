// Copyright 2015-2022, University of Colorado Boulder

/**
 * ElectronNode is the visual representation of an electron.
 * An electron is blue, and has a specular highlight with the light source coming from below.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 9;

type SelfOptions = {};

type ElectronNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ElectronNode extends ShadedSphereNode {

  constructor( providedOptions?: ElectronNodeOptions ) {

    const options = optionize<ElectronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: 'rgb( 120, 120, 255 )',
      highlightColor: 'rgb( 140, 140, 255 )'
    }, providedOptions );

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );