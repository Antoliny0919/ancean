import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../../api/auth';

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await authAPI.signin({ email, password });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const reIssueAccessToken = createAsyncThunk(
  'auth/reIssueAccessToken',
  async ({ refresh }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await authAPI.reIssueAccessToken({ refresh });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async ({ headers }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await authAPI.getUserData({ headers });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

const initialState = {
  user: {
    token: {
      access: '',
    },
    info: {
      name: '',
      email: '',
      introduce: '',
      is_staff: null,
    },
    auth: null,
  },
  signin: {
    email: '',
    password: '',
    message: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeValue: (state, { payload: { step, name, value } }) => {
      const section = state[step];
      section[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.rejected, ({ signin }) => {
      signin.message = '존재하지 않는 유저입니다.';
      signin.password = '';
    });
    builder.addCase(reIssueAccessToken.fulfilled, ({ user }, { payload }) => {
      const { access } = payload;
      user.token.access = access;
    });
    builder.addCase(reIssueAccessToken.rejected, (state) => {
      state.user.auth = false;
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.user.info = { ...payload };
    });
  },
});

export const { changeValue } = authSlice.actions;
export default authSlice.reducer;
