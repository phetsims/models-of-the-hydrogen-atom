// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of utility functions used in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../dot/js/dotRandom.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

// See chooseWeightedValue.
export type WeightedValue = {
  value: number;  // There are no constraints on the value.
  weight: number; // The weight must be >= 0, and will be verified.
};

const MOTHAUtils = {

  /**
   * Gets a random sign for a number.
   */
  nextSign(): 1 | -1 {
    return ( dotRandom.nextBoolean() ? 1 : -1 );
  },

  /**
   * Gets a random angle from the range [0, 2 * PI), in radians.
   */
  nextAngle(): number {
    return dotRandom.nextDoubleBetween( 0, 2 * Math.PI );
  },

  /**
   * Normalizes an angle to the range [0, 2 * PI), in radians.
   */
  // REVIEW: Most sims use Utils.moduloBetweenDown(), why create a new function for this? https://github.com/phetsims/models-of-the-hydrogen-atom/issues/125
  normalizeAngle( angle: number ): number {
    let normalizedAngle = angle % ( 2 * Math.PI );
    if ( normalizedAngle < 0 ) {
      normalizedAngle += ( 2 * Math.PI );
    }
    assert && assert( normalizedAngle >= 0 && normalizedAngle <= ( 2 * Math.PI ), `Invalid normalizedAngle: ${normalizedAngle}` );
    return normalizedAngle;
  },

  /**
   * Randomly selects a value from a collection of weighted values.
   */
  chooseWeightedValue( weightedValues: WeightedValue[] ): number | null {

    assert && assert( _.every( weightedValues, weightedValue => ( weightedValue.weight >= 0 ) ),
      'Every value must have a non-negative weight.' );

    // Compute the normalization factor for the weights.
    let totalWeight = 0;
    weightedValues.forEach( weightedValue => {
      totalWeight += weightedValue.weight;
    } );
    const normalizationFactor = 1 / totalWeight;

    // Build the internal list that is used for choosing. Each entry is normalized, with an associated weight that is
    // the sum of its own probability plus the cumulative normalized weights of all entries before it in the list.
    const normalizedWeightedValues: WeightedValue[] = [];
    let p = 0;
    weightedValues.forEach( weightedValue => {
      p += weightedValue.weight * normalizationFactor;
      normalizedWeightedValues.push( { value: weightedValue.value, weight: p } );
    } );
    assert && assert( _.every( normalizedWeightedValues, value => ( value.weight >= 0 && value.weight <= 1 ) ),
      'invalid normalizedWeightedValues' );

    // Choose a weighted value.
    const weight = dotRandom.nextDouble();
    let weightedValue: number | null = null;
    for ( let i = 0; i < normalizedWeightedValues.length && weightedValue === null; i++ ) {
      const normalizedWeightedValue = normalizedWeightedValues[ i ];
      if ( weight <= normalizedWeightedValue.weight ) {
        weightedValue = normalizedWeightedValue.value;
      }
    }
    assert && assert( weightedValue !== null, 'Expected to have a weightedValue by this point.' );
    return weightedValue;
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;