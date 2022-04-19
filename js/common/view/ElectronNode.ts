// Copyright 2015-2020, University of Colorado Boulder

/**
 * ElectronNode is the visual representation of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 9;

type SelfOptions = {};

type ElectronNodeOptions = SelfOptions & Omit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ElectronNode extends ShadedSphereNode {

  constructor( providedOptions?: ElectronNodeOptions ) {

    const options = optionize<ElectronNodeOptions, SelfOptions, ShadedSphereNodeOptions>( {

      // ShadedSphereNodeOptions
      mainColor: 'rgb( 120, 120, 255 )',
      highlightColor: 'rgb( 140, 140, 255 )'
    }, providedOptions );

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );