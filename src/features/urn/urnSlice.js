/*
 * FIXME: update this
 *
 The Urn model has a couple of "built in" assumptions. 

 Some properties are exclusive -- a ball cannot be both Small and Large,
 neither can it be Metal and Wood -- while other properties can be combined --
 a ball can be "Small and Metal".  I've grouped these Exclusion sets in the
 above.

 The number of balls in the Urn is the total of the number distinct balls in
 our discourse.  The Urn does not contain any "undescribed balls".  So, the
 sum of the Small and Large balls must be the same as the total of the Urn.
 Similarly, for the Material set and the Combinations set. In general, the
 total number of balls in an Exclusion set must be the same as the total
 number of balls in the Urn.

 Now what is to happen if I change one of the values?

 If I increase/decrease the Total number of balls in the Urn, I should
 increase/decrease the number of balls in each Exclusion set so that the
 ratios remain approximately the same.  The most accurate way to do that is to
 apply the modifications to the Combinations set and let the resulting numbers
 bubble up to the Material and Size sets.

 If I start at the other end and increase/decrease the number of Large and
 Metal balls, what should I do?  The easiest approach is to allow the Total
 number of balls in the Urn (etc) to increase/decrease to compensate.

 Since the urn contains a integer number of balls of each combination, it will
 not always be possible to keep the ratios exactly the same and will have to
 introduce some randomness. For example, if we have 1 of each combination (for
 a total of 4) and increase the total by 1, then we are going to have pick one
 of the combinations to receive the new ball. That will result in one of the
 combinations having twice the number balls as the other combinations. In the
 below we try to do this fairly, but it does make the setting not always
 deterministic.

 Finally we also cap the total number of balls at a sensible maximum so we don't
 get rediculous numbers.
*/

import { createSlice } from '@reduxjs/toolkit';

export const MAX_IN_URN = 10000;

const initialUrn = {

  // The current values being used for calculations
  current : {
    total: 0,

    // Exclusive Materials
    metal: 0,
    wood: 0,

    // Exclusive Sizes
    small: 0,
    large: 0,

    // Exclusive Combinations
    small_metal: 0,
    large_metal: 0,
    small_wood: 0,
    large_wood: 0,

    error: false, // whether an error state was triggered
    remainder: 0, // the remainer that had to be distributed
  },

  // Track a proposed change to current values
  proposed : {
    total: 0,

    // Exclusive Materials
    metal: 0,
    wood: 0,

    // Exclusive Sizes
    small: 0,
    large: 0,

    // Exclusive Combinations
    small_metal: 0,
    large_metal: 0,
    small_wood: 0,
    large_wood: 0,

    error: false, // whether an error state is triggered
    remainder: 0, // the remainer that has to be distributed
  },
};


// Instead of importing all of lodash
const sum = list => {
  return list.reduce((a, b) => a + b, 0);
};

const share_value = (value, sizes) => {
  // Split up "value" into an ordered list of integers according to the relative
  // sizes of "sizes" list.
  //
  // Note: since apply_constraints() has been run, we can assume all the values
  // in the "sizes" list are non-negative at this point.

  // FIXME: only do this if at least one number is zero
  // Nudge all sizes up so that zeros don't get too sticky
  sizes = sizes.map(x => x + 1);
  let total = sum(sizes);

  // Split "value" according to ratios of the "sizes" to the total
  const parts = [];
  for (let size of sizes) {
    let part = Math.round((value * size) / total);
    parts.push(part);
  }

  // Since our "value" and "sizes" are integers, we may have gone over or under
  // by up to the length of the "sizes" array.
  let remainder = value - sum(parts);

  // This should not be possible, but lets trap and adjust in case of bugs
  if (Math.abs(remainder) > sizes.length) {
    console.error(
      'Got an impossible value for remainder: ignoring value change'
    );
    console.debug({ value }, { total }, { remainder });
    console.debug({ sizes }, { parts });
    return [0, 0, 0, 0];
  }

  let loops = 0;
  while (remainder !== 0) {
    loops++;
    // Trap infinite loops in case of (future) bugs
    if (loops > 20) {
      console.error(
        'Breaking from potential infinite loop ' +
          'while attempting to assign remainder'
      );
      console.debug({ value }, { total }, { remainder });
      console.debug({ sizes }, { parts });
      break;
    }
    // Pick a random index
    // FIXME: we should pick based on the distribution of sizes not a flat
    // random distribution.
    let index = Math.floor(Math.random() * parts.length);
    if (remainder > 0) {
      parts[index]++;
      remainder--;
      continue;
    }
    if (remainder < 0) {
      parts[index]--;
      remainder++;
      continue;
    }
  }

  // I'm a little paranoid about the above, so
  // raise an error if my calculations are wrong.
  total = sum(parts);
  if (total !== value) {
    console.error('Sharing value is out by ', total - value);
  }
  return parts;
};

const apply_constraints = (proposed, current) => {
  // Ensure our changes will result in a consistent state that reflects out
  // underlying constraints. For this we take the values for the "Combinations"
  // set as our base and let the results bubble up to the other sets and the
  // total.
  //
  // Since messages to the store may have come form all over the place, and be
  // out of sync, we'll be defensive and allow for some potential crazy values
  // and adjust the results accordingly.

  const combination_keys = [
    'small_wood',
    'small_metal',
    'large_wood',
    'large_metal',
  ];

  try {
    // Ensure all the combination values are greater than zero
    for (let key of combination_keys) {
      if (proposed[key] < 0) {
        console.debug(`Got a negative value for ${key}`);
        proposed[key] = 0;
      }
    }
    // NB: The above also implies the total is not negative

    let total = sum(combination_keys.map(k => proposed[k]));

    // Ensure we don't sum higher than the max that fits in the urn
    if (total > MAX_IN_URN) {
      throw RangeError;
    }

    // Ensure all the exclusive subsets add up
    proposed.small = proposed.small_metal + proposed.small_wood;
    proposed.large = proposed.large_metal + proposed.large_wood;

    proposed.wood = proposed.small_wood + proposed.large_wood;
    proposed.metal = proposed.small_metal + proposed.large_metal;

    // Ensure the total in the urn matches the total of the combinations
    proposed.total = total;
  } catch (e) {
    if (e.name === 'RangeError') {
      console.debug('Caught a RangeError');
      // revert our change
      for (let key in current) {
        proposed[key] = current[key];
      }
    }
  }
};

export const urnSlice = createSlice({
  name: 'urn',
  initialState: initialUrn,
  reducers: {
    updateTotal: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.total;

      if (change === 0 || isNaN(change)) return;

      const [
        small_wood_change,
        large_wood_change,
        small_metal_change,
        large_metal_change,
      ] = share_value(change, [
        current.small_wood,
        current.large_wood,
        current.small_metal,
        current.large_metal,
      ]);

      proposed.small_wood += small_wood_change;
      proposed.large_wood += large_wood_change;
      proposed.small_metal += small_metal_change;
      proposed.large_metal += large_metal_change;

      apply_constraints(current, proposed);
    },

    updateWood: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.wood;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, large_wood_change] = share_value(change, [
        current.small_wood,
        current.large_wood,
      ]);

      proposed.small_wood += small_wood_change;
      proposed.large_wood += large_wood_change;

      apply_constraints(current, proposed);
    },

    updateMetal: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.metal;

      if (change === 0 || isNaN(change)) return;

      const [small_metal_change, large_metal_change] = share_value(change, [
        current.small_metal,
        current.large_metal,
      ]);

      proposed.small_metal += small_metal_change;
      proposed.large_metal += large_metal_change;

      apply_constraints(current, proposed);
    },

    updateSmall: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.small;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, small_metal_change] = share_value(change, [
        current.small_wood,
        current.small_metal,
      ]);

      proposed.small_wood += small_wood_change;
      proposed.small_metal += small_metal_change;

      apply_constraints(current, proposed);
    },

    updateLarge: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.large;

      if (change === 0 || isNaN(change)) return;

      const [large_wood_change, large_metal_change] = share_value(change, [
        current.large_wood,
        current.large_metal,
      ]);

      proposed.large_metal += large_metal_change;
      proposed.large_wood += large_wood_change;

      apply_constraints(current, proposed);
    },

    updateSmallMetal: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.small_metal;

      if (change === 0 || isNaN(change)) return;

      proposed.small_metal += change;
      apply_constraints(current, proposed);
    },

    updateLargeMetal: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.large_metal;

      if (change === 0 || isNaN(change)) return;

      proposed.large_metal += change;
      apply_constraints(current, proposed);
    },

    updateSmallWood: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.small_wood;

      if (change === 0 || isNaN(change)) return;

      proposed.small_wood += change;
      apply_constraints(current, proposed);
    },

    updateLargeWood: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      const change = action.payload - state.large_wood;

      if (change === 0 || isNaN(change)) return;

      proposed.large_wood += change;
      apply_constraints(current, proposed);
    },

    updateAll: (state, action) => {
      const current = state.current;
      const proposed = state.proposed;

      // TODO check each item is defined in payload?

      proposed.small_wood = action.payload.small_wood;
      proposed.large_wood = action.payload.large_wood;
      proposed.small_metal = action.payload.small_metal;
      proposed.large_metal = action.payload.large_metal;

      apply_constraints(current, proposed);
    },
  },
});

export const {
  updateTotal,
  updateWood,
  updateMetal,
  updateSmall,
  updateLarge,
  updateSmallMetal,
  updateLargeMetal,
  updateSmallWood,
  updateLargeWood,
  updateAll,
} = urnSlice.actions;

export default urnSlice.reducer;
