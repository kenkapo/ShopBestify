import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut,saveCurrentUser,fetchCurrentUser,deleteCurrentUser } from './authAPI';

const initialState = {
  loggedInUser: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const saveCurrentUserAsync = createAsyncThunk(
  'user/saveCurrentUser',
  async (loginInfo) => {
    const response = await saveCurrentUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCurrentUserAsync=createAsyncThunk(
  'user/fetchCurrentUser',
  async()=>{
    const response=await fetchCurrentUser();
    return response.data[0];
  }
);

export const deleteCurrentUserAsync=createAsyncThunk( 
  'user/deleteCurrentUser',
  async()=>{
    const response=await deleteCurrentUser();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
      .addCase(saveCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=action.payload;
      }) 
      .addCase(deleteCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCurrentUserAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

// export const { } = authSlice.actions;

export default authSlice.reducer;
