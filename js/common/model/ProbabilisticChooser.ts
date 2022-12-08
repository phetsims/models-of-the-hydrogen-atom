// Copyright 2022, University of Colorado Boulder

/**
 * ProbabilisticChooser randomly selects a value from a collection of weighted values.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export type ProbabilisticChooserEntry<T> = {
  value: T;
  weight: number;
};

export default class ProbabilisticChooser<T> {

  private readonly normalizedEntries: ProbabilisticChooserEntry<T>[];

  public constructor( entries: ProbabilisticChooserEntry<T>[] ) {
    assert && assert( _.every( entries, entry => ( entry.weight >= 0 ) ) ); //TODO correct?

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
  public getNext(): T | null { //TODO should always return T, never null
    const weight = dotRandom.nextDouble();
    let value: T | null = null;
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

modelsOfTheHydrogenAtom.register( 'ProbabilisticChooser', ProbabilisticChooser );