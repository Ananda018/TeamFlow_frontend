import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  showSplash: false,
  settingData: {},
  appSetting: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setShowSplash: (state, action) => {
      state.showSplash = action.payload;
    },
    onAppLoad: (state) => {
      state.showSplash = false;
    },
  },
});

export const { setUser, setToken, setShowSplash, onAppLoad } = authSlice.actions;
export default authSlice.reducer;
