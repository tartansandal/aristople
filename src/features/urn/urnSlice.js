import { createSlice } from '@reduxjs/toolkit';

export const MAX_IN_URN = 10000;

const initialUrn = {
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
};

/*
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

// save on importing lodash
const sum = list => {
  return list.reduce((a, b) => a + b, 0);
};

const share_value = (value, sizes) => {
  // Split up "value" into integers according to the relative sizes of "sizes".
  //
  // Note: we assume all the "sizes" are non-negative at this point.

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
  if (Math.abs(remainder) > sizes.length) {
    // This should not be possible, but lets trap and adjust in case of bugs
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

  // OK, I'm a little paranoid about the values being wrong here.
  total = sum(parts);
  if (total !== value) {
    console.error('Sharing value is out by ', total - value);
  }
  return parts;
};

const apply_constraints = (current, previous) => {
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
      if (current[key] < 0) {
        console.debug(`Got a negative value for ${key}`);
        current[key] = 0;
      }
    }
    // NB: The above also implies the total is not negative

    let total = sum(combination_keys.map(k => current[k]));

    // Ensure we don't sum higher than the max that fits in the urn
    if (total > MAX_IN_URN) {
      throw RangeError;
    }

    // Ensure all the exclusive subsets add up
    current.small = current.small_metal + current.small_wood;
    current.large = current.large_metal + current.large_wood;

    current.wood = current.small_wood + current.large_wood;
    current.metal = current.small_metal + current.large_metal;

    // Ensure the total in the urn matches the total of the combinations
    current.total = total;
  } catch (e) {
    if (e.name === 'RangeError') {
      console.debug('Caught a RangeError');
      // revert our change
      for (let key in previous) {
        current[key] = previous[key];
      }
    }
  }
};

export const urnSlice = createSlice({
  name: 'urn',
  initialState: initialUrn,
  reducers: {
    updateTotal: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.total;

      if (change === 0 || isNaN(change)) return;

      const [
        small_wood_change,
        large_wood_change,
        small_metal_change,
        large_metal_change,
      ] = share_value(change, [
        state.small_wood,
        state.large_wood,
        state.small_metal,
        state.large_metal,
      ]);

      state.small_wood += small_wood_change;
      state.large_wood += large_wood_change;
      state.small_metal += small_metal_change;
      state.large_metal += large_metal_change;

      apply_constraints(state, copy);
    },

    updateWood: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.wood;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, large_wood_change] = share_value(change, [
        state.small_wood,
        state.large_wood,
      ]);

      state.small_wood += small_wood_change;
      state.large_wood += large_wood_change;

      apply_constraints(state, copy);
    },

    updateMetal: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.metal;

      if (change === 0 || isNaN(change)) return;

      const [small_metal_change, large_metal_change] = share_value(change, [
        state.small_metal,
        state.large_metal,
      ]);

      state.small_metal += small_metal_change;
      state.large_metal += large_metal_change;

      apply_constraints(state, copy);
    },

    updateSmall: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.small;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, small_metal_change] = share_value(change, [
        state.small_wood,
        state.small_metal,
      ]);

      state.small_wood += small_wood_change;
      state.small_metal += small_metal_change;

      apply_constraints(state, copy);
    },

    updateLarge: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.large;

      if (change === 0 || isNaN(change)) return;

      const [large_wood_change, large_metal_change] = share_value(change, [
        state.large_wood,
        state.large_metal,
      ]);

      state.large_metal += large_metal_change;
      state.large_wood += large_wood_change;

      apply_constraints(state, copy);
    },

    updateSmallMetal: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.small_metal;

      if (change === 0 || isNaN(change)) return;

      state.small_metal += change;
      apply_constraints(state, copy);
    },
    updateLargeMetal: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.large_metal;

      if (change === 0 || isNaN(change)) return;

      state.large_metal += change;
      apply_constraints(state, copy);
    },
    updateSmallWood: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.small_wood;

      if (change === 0 || isNaN(change)) return;

      state.small_wood += change;
      apply_constraints(state, copy);
    },
    updateLargeWood: (state, action) => {
      const copy = { ...state };
      const change = action.payload - state.large_wood;

      if (change === 0 || isNaN(change)) return;

      state.large_wood += change;
      apply_constraints(state, copy);
    },

    updateAll: (state, action) => {
      const copy = { ...state };

      // TODO check each item is defined in payload?

      state.small_wood = action.payload.small_wood;
      state.large_wood = action.payload.large_wood;
      state.small_metal = action.payload.small_metal;
      state.large_metal = action.payload.large_metal;

      apply_constraints(state, copy);
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
