// Copyright 2022, University of Colorado Boulder

/**
 * RutherfordScattering is the algorithm for computing the alpha particle trajectories for Plum Pudding, Bohr,
 * deBroglie and Schrodinger hydrogen-atom models. The only difference between models is the value of the constant D.
 *
 * This algorithm was specified by Sam McKagan in "Trajectories for Rutherford Scattering", which can be found at
 * doc/Trajectories_for_Rutherford_Scattering.pdf.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import AlphaParticle from './AlphaParticle.js';
import HydrogenAtomModel from './HydrogenAtomModel.js';

const RutherfordScattering = {

  moveParticle( hydrogenAtomModel: HydrogenAtomModel, alphaParticle: AlphaParticle, dt: number ): void {
    //TODO
  }
};

modelsOfTheHydrogenAtom.register( 'RutherfordScattering', RutherfordScattering );
export default RutherfordScattering;