import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export interface AuthState {
  error: string;
  isLoading: boolean;
  auth: {
    accessToken: string;
    refreshToken: string;
    user: {
      Role: string;
    };
  } | null;
}

const getAuthState = () => {
  const storedValue = localStorage.getItem("authTokens");
  const authTokens = storedValue ? JSON.parse(storedValue) : null;
  if (authTokens)
    return {
      ...authTokens,
      user: jwtDecode(authTokens.accessToken),
    };
  else return null;
};

const initialState: AuthState = {
  error: "",
  isLoading: false,
  auth: getAuthState(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoading = false;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.auth = null;
      localStorage.removeItem("authTokens");
    },
    setToken: (state, action) => {
      state.auth!.accessToken = action.payload;
      state.auth!.user = jwtDecode(action.payload);
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          accessToken: state.auth!.accessToken,
          refreshToken: state.auth!.refreshToken,
        })
      );
    },
    refreshFail: (state, action) => {
      state.error = action.payload;
      state.auth = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const {
  authPending,
  loginFail,
  loginSuccess,
  logoutSuccess,
  setToken,
  refreshFail,
} = authSlice.actions;

export default authSlice.reducer;
