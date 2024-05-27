import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  isLogged: false,
  userName: "",
  authToken: "",
  role: "",
  id: "",
  tokenExpired: true,
  profileImage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setIsLogged: (state) => {
      state.isLogged = false;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
    setTokenExpired: (state, action) => {
      state.tokenExpired = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const {
  login,
  setId,
  setUsername,
  setAuthToken,
  setRole,
  setIsLogged,
  logout,
  setTokenExpired,
  setProfileImage,
} = userSlice.actions;
export const userReducer = persistedReducer;
