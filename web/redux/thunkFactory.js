import { createAsyncThunk } from '@reduxjs/toolkit';

export function commonThunkFactory(type, action, param, api) {
  const actionType = `${type}/${action}`;

  const logic = async (param, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await api[action](param);
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  };

  return createAsyncThunk(actionType, logic(param));
}

// export const getPost = createAsyncThunk(
//   'editor/getPost',
//   async ({ query, headers = {} }, { rejectWithValue }) => {
//     let result = null;
//     try {
//       const response = await postAPI.getPost({ query, headers });
//       result = response.data;
//     } catch (err) {
//       result = rejectWithValue(err.response);
//     }
//     return result;
//   },
// );
