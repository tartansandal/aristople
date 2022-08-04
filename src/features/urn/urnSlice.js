import { createSlice } from '@reduxjs/toolkit';

const MAX_IN_URN = 10000;

const sum = (a, b) => a + b;

const share = (value, sizes) => {
  // Split up "value" into integers according to the relative sizes of "sizes".
  //
  // We assume all sizes are non-negative.

  let total = sizes.reduce(sum, 0);

  // If all our "sizes" are 0, then we want to split "value" evenly
  if (total === 0) {
    sizes = sizes.map(() => 1);
    total = sizes.reduce(sum, 0);
  }

  // Split "value" according to ratios of the "sizes" to the total
  const parts = [];
  for (let size of sizes) {
    let part = Math.round((value * size) / total);
    parts.push(part);
  }

  // Since our "value" and "sizes" are integers, we may have gone over or under
  // by up to the length of the "sizes" array.
  let remainder = value - parts.reduce(sum, 0);
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

  let total = combination_keys.map(k => state[k]).reduce(sum);

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

  initialState: {
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
  },

  reducers: {
    updateTotal: (state, action) => {
      const change = action.payload - state.total;

      if (change === 0 || isNaN(change)) return;

      const [
        small_wood_change,
        large_wood_change,
        small_metal_change,
        large_metal_change,
      ] = share(change, [
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

      const [small_wood_change, large_wood_change] = share(change, [
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

      const [small_metal_change, large_metal_change] = share(change, [
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

      const [small_wood_change, small_metal_change] = share(change, [
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

      const [large_wood_change, large_metal_change] = share(change, [
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
