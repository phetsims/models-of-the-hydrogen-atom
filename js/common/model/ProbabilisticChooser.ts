// Copyright 2022-2023, University of Colorado Boulder

//TODO Convert ProbabilisticChooser to a utility function, so that we're not constantly instantiating a class.
/**
 * ProbabilisticChooser randomly selects a value from a collection of weighted values.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export type WeightedValue = {
  value: number;
  weight: number;
};

export default class ProbabilisticChooser {

  private readonly normalizedEntries: WeightedValue[];

  public constructor( entries: WeightedValue[] ) {
    assert && assert( _.every( entries, entry => ( entry.weight >= 0 ) ) );

    // Compute the normalization factor for the weights.
    let totalWeight = 0;
    for ( let i = 0; i < entries.length; i++ ) {
      totalWeight += entries[ i ].weight;
    }
    const normalizationFactor = 1 / totalWeight;

    // Build the internal list that is used for choosing. Each entry is normalized, with an associated weight that is
    // the sum of its own probability plus the cumulative normalized weights of all entries before it in the list.
    // This makes the getNext() algorithm work properly.
    this.normalizedEntries = [];
    let p = 0;
    for ( let i = 0; i < entries.length; i++ ) {
      p += entries[ i ].weight * normalizationFactor;
      this.normalizedEntries.push( { value: entries[ i ].value, weight: p } );
    }
    assert && assert( _.every( this.normalizedEntries, entry => ( entry.weight >= 0 && entry.weight <= 1 ) ) ); //TODO correct?
  }

  /**
   * Gets a value using a random probability of selection.
   */
  public getNext(): number | null { //TODO should always return number , never null
    const weight = dotRandom.nextDouble();
    let value: number | null = null;
    for ( let i = 0; i < this.normalizedEntries.length && value === null; i++ ) {
      const entry = this.normalizedEntries[ i ];
      if ( weight <= entry.weight ) {
        value = entry.value;
      }
    }
    assert && assert( value !== null );
    return value;
  }
}

export function chooseWeightedValue( weightedValues: WeightedValue[] ): number | null {

  assert && assert( _.every( weightedValues, weightedValue => ( weightedValue.weight >= 0 ) ) );

  // Compute the normalization factor for the weights.
  let totalWeight = 0;
  weightedValues.forEach( weightedValue => {
    totalWeight += weightedValue.weight;
  } );
  const normalizationFactor = 1 / totalWeight;

  // Build the internal list that is used for choosing. Each entry is normalized, with an associated weight that is
  // the sum of its own probability plus the cumulative normalized weights of all entries before it in the list.
  // This makes the getNext() algorithm work properly.
  const normalizedWeightedValues: WeightedValue[] = [];
  let p = 0;
  weightedValues.forEach( weightedValue => {
    p += weightedValue.weight * normalizationFactor;
    normalizedWeightedValues.push( { value: weightedValue.value, weight: p } );
  } );
  assert && assert( _.every( normalizedWeightedValues, value => ( value.weight >= 0 && value.weight <= 1 ) ) );

  // Choose a value.
  const weight = dotRandom.nextDouble();
  let value: number | null = null;
  for ( let i = 0; i < normalizedWeightedValues.length && value === null; i++ ) {
    const normalizedWeightedValue = normalizedWeightedValues[ i ];
    if ( weight <= normalizedWeightedValue.weight ) {
      value = normalizedWeightedValue.value;
    }
  }
  assert && assert( value !== null );
  return value;
}

modelsOfTheHydrogenAtom.register( 'ProbabilisticChooser', ProbabilisticChooser );