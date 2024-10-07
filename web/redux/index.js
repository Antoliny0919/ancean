import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import editor from '../components/editor/modules/editor';
import auth from '../components/auth/modules/auth';

const isProduction = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  editor,
  auth,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: (state, action) => {
      switch (action.type) {
        case HYDRATE:
          return { ...state, ...action.payload.sideOpend };
        default:
          return rootReducer(state, action);
      }
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    ...(isProduction ? { devTools: false } : { devTools: true }),
  });
  return store;
};

const wrapper = createWrapper(makeStore, { debug: !isProduction });

export default wrapper;
