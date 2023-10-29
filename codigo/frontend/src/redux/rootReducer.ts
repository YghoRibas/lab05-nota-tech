import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import settingReducer from './slices/setting';


const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const settingPersistConfig = {
  key: 'setting',
  storage,
  keyPrefix: 'redux-'
};

const rootReducer = combineReducers({
  setting: persistReducer(settingPersistConfig, settingReducer),
});

export type RootState = ReturnType<typeof rootReducer>

export { rootPersistConfig, rootReducer };
