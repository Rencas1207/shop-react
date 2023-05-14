import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// const stripe = require('stripe')(
//   'sk_test_51N7m4DHuS4xEMmgAI805nTDJVmDvOI3gM94bGo70Yk0BNbM2ztib58ddcH9ofkCFXli3IZ6aWhKps8YDuDIgDvbq00hFJuukPg'
// );

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
