import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { userReducer } from "@/state/UserSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { folderReducer } from "@/state/FolderSlice";

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: [
    "authToken",
    "role",
    "userName",
    "isLogged",
    "id",
    "tokenExpired",
    "profileImage",
  ],
};

const folderPersistConfig = {
  key: "folder",
  storage: storage,
  whitelist: ["navigatedFolders", "currentFolder"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  folder: persistReducer(folderPersistConfig, folderReducer),
});

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
