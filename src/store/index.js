import { configureStore } from '@reduxjs/toolkit';
import urnReducer from '../features/urn/urnSlice';

export default configureStore({
  reducer: {
    urn: urnReducer,
  },
});
