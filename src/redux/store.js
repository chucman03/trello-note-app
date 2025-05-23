import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from "./activeBoard/activeBoardSlice";
import { userReducer } from "./user/userSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { activeCardReducer } from "./activeCard/activeCardSlice";
import { notificationsReducer } from "./notifications/notificationsSlice";

const rootPersistConfig ={
  key: 'root',
  storage: storage,
  whitelist: ['user'] // dinh nghia cac du lieu duoc duy tri khi f5
}

// combine cac reducer trong du an
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer
})
// thu hien persist reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
