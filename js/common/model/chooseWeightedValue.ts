// Copyright 2024, University of Colorado Boulder

/**
 * chooseWeightedValue randomly selects a value from a collection of weighted values.
 *
 * This was ported from ProbabilisticChooser.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';

export type WeightedValue = {
  value: number;
  weight: number;
};

export default function chooseWeightedValue( weightedValues: WeightedValue[] ): number | null {

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