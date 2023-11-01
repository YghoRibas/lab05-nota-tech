import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer, RootState } from './rootReducer';

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }),
});

export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch: { (): AppDispatch } = useAppDispatch;

export { store, persistor, dispatch, useSelector, useDispatch };
