import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

interface AuthState {
  isAuthInitialized: boolean;
  token: string | undefined;
}

const initialState: AuthState = {
  isAuthInitialized: false,
  token: getCookie('token'),
};

const removeAuthCookie = (name: string) => {
  deleteCookie(name);
};

const setAuthCookie = (token: string, name: string) => {
  setCookie(name, token, {
    maxAge: 24 * 60 * 60,
    path: '/',
  });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      setAuthCookie(action.payload, 'token');
    },
    removeToken: (state) => {
      state.token = undefined;
      state.isAuthInitialized = false;
      removeAuthCookie('token');
    },
    setAuthInitialization: (state, action: PayloadAction<boolean>) => {
      state.isAuthInitialized = action.payload;
    },
  },
});

export const { setAuthInitialization, removeToken, setToken } =
  authSlice.actions;

export default authSlice.reducer;
