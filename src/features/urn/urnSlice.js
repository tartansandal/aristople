import { createSlice } from '@reduxjs/toolkit';

const MAX_IN_URN = 10000;

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

  let total = sum(sizes);

  // If all our "sizes" are 0, then we want to split "value" evenly
  if (total === 0) {
    sizes = sizes.map(() => 1);
    total = sum(sizes);
  }

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
    // This should not be possible
    console.error('Impossible value for remainder');
    console.log({ value }, { total }, { remainder });
    console.log({ sizes }, { parts });
    return [0, 0, 0, 0];
  }

  let loops = 0;
  while (remainder !== 0) {
    loops++;
    // Trap infinite loops in case of bugs
    if (loops > 10) {
      console.error('Breaking from infinite loop');
      console.log({ value }, { total }, { remainder });
      console.log({ sizes }, { parts });
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
  return parts;
};

const apply_constraints = state => {
  // Ensure our changes have reflected in a consistent state that reflects out
  // underlying constraints. For this we take the values for the "Combinations"
  // set as our base and let the results bubble up. Since messages to the store
  // may have come form all over the place, and be out of sync, we allow for
  // some potential crazy values and adjust the results accordingly.

  const combination_keys = [
    'small_wood',
    'small_metal',
    'large_wood',
    'large_metal',
  ];

  // Ensure all the combination values are greater than zero
  for (let key of combination_keys) {
    if (state[key] < 0) {
      state[key] = 0;
    }
  }
  // The above also implies the total is not negative

  let total = sum(combination_keys.map(k => state[k]));

  // Ensure we don't sum higher than the max that fits in the urn
  if (total > MAX_IN_URN) {
    const diff = total - MAX_IN_URN;

    // Reduce the largest value to compensate
    let key_of_largest = combination_keys.reduce((k, n) =>
      state[k] > state[n] ? k : n
    );
    // console.log(`adjusting ${key_of_largest} to cap total: ${diff}`)
    state[key_of_largest] -= diff;

    // Update the total accordingly
    total -= diff;
  }
  // Ensure the total in the urn matches the total of the combinations
  state.total = total;

  // Ensure all the exclusive subsets add up
  state.small = state.small_metal + state.small_wood;
  state.large = state.large_metal + state.large_wood;

  state.wood = state.small_wood + state.large_wood;
  state.metal = state.small_metal + state.large_metal;
};

export const urnSlice = createSlice({
  name: 'urn',
  initialState: initialUrn,
  reducers: {
    updateTotal: (state, action) => {
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

      apply_constraints(state);
    },
    updateWood: (state, action) => {
      const change = action.payload - state.wood;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, large_wood_change] = share_value(change, [
        state.small_wood,
        state.large_wood,
      ]);

      state.small_wood += small_wood_change;
      state.large_wood += large_wood_change;

      apply_constraints(state);
    },
    updateMetal: (state, action) => {
      const change = action.payload - state.metal;

      if (change === 0 || isNaN(change)) return;

      const [small_metal_change, large_metal_change] = share_value(change, [
        state.small_metal,
        state.large_metal,
      ]);

      state.small_metal += small_metal_change;
      state.large_metal += large_metal_change;

      apply_constraints(state);
    },
    updateSmall: (state, action) => {
      const change = action.payload - state.small;

      if (change === 0 || isNaN(change)) return;

      const [small_wood_change, small_metal_change] = share_value(change, [
        state.small_wood,
        state.small_metal,
      ]);

      state.small_metal += small_metal_change;
      state.small_wood += small_wood_change;

      apply_constraints(state);
    },
    updateLarge: (state, action) => {
      const change = action.payload - state.large;

      if (change === 0 || isNaN(change)) return;

      const [large_wood_change, large_metal_change] = share_value(change, [
        state.large_wood,
        state.large_metal,
      ]);

      state.large_metal += large_metal_change;
      state.large_wood += large_wood_change;

      apply_constraints(state);
    },

    updateSmallMetal: (state, action) => {
      const change = action.payload - state.small_metal;

      if (change === 0 || isNaN(change)) return;

      state.small_metal += change;
      apply_constraints(state);
    },
    updateLargeMetal: (state, action) => {
      const change = action.payload - state.large_metal;

      if (change === 0 || isNaN(change)) return;

      state.large_metal += change;
      apply_constraints(state);
    },
    updateSmallWood: (state, action) => {
      const change = action.payload - state.small_wood;

      if (change === 0 || isNaN(change)) return;

      state.small_wood += change;
      apply_constraints(state);
    },
    updateLargeWood: (state, action) => {
      const change = action.payload - state.large_wood;

      if (change === 0 || isNaN(change)) return;

      state.large_wood += change;
      apply_constraints(state);
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
} = urnSlice.actions;

export default urnSlice.reducer;
