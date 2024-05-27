import {
  FolderSliceState,
  emptyDirectory,
} from "@/interfaces/FolderSliceState";
import IDirectory from "@/interfaces/IDirectory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: FolderSliceState = {
  currentFolder: emptyDirectory,
  navigatedFolders: [],
};

const folderSlice = createSlice({
  name: "folder",
  initialState: initialState,
  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    setInitialState: (state) => {
      state = initialState;
    },
    addElement: (state, action: PayloadAction<IDirectory>) => {
      state.navigatedFolders.push(action.payload);
    },
    setLastVisitedFolder: (state) => {
      if (state.navigatedFolders.length - 1 < 0) return;
      state.currentFolder =
        state.navigatedFolders[state.navigatedFolders.length - 1];
    },
    removeLastElement: (state) => {
      state.navigatedFolders.pop();
      if (state.navigatedFolders.length === 0) {
        const initialCurrentFolderState = {
          id: "",
          name: "",
          parentId: "",
        };
        state.currentFolder = emptyDirectory;
      } else {
        const lastFolder =
          state.navigatedFolders[state.navigatedFolders.length - 1];
        state.currentFolder.id = lastFolder.id;
        state.currentFolder.name = lastFolder.name;
        state.currentFolder.parentId = lastFolder.parentId;
      }
    },
  },
});

const persistConfig = {
  key: "folder",
  storage,
};

const persistedReducer = persistReducer(persistConfig, folderSlice.reducer);

export const {
  setLastVisitedFolder,
  setCurrentFolder,
  setInitialState,
  addElement,
  removeLastElement,
} = folderSlice.actions;
export const folderReducer = persistedReducer;
