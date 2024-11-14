import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: Token | null;
  userName: Name | null;
  userId: UserId | null;
}

const initialState: AuthState = {
  token: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.token = action.payload.token ?? state.token;
      state.userName = action.payload.userName ?? state.userName;
      state.userId = action.payload.userId ?? state.userId;
    },
    clearAuthData: state => {
      state.token = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
