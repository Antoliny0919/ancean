import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@/api/client';
import * as postAPI from '@/api/post';
import * as imageAPI from '@/api/image';

const MEDIA_ROOT = `${client.defaults.baseURL}/media`;

export const getPost = createAsyncThunk(
  'editor/getPost',
  async ({ query, headers = {} }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await postAPI.getPost({ query, headers });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const getRetrievePost = createAsyncThunk(
  'editor/getRetrievePost',
  async ({ id, headers = {} }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await postAPI.getRetrievePost({ id, headers });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const createPost = createAsyncThunk(
  'editor/createPost',
  async ({ body, headers }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await postAPI.createPost({
        body,
        headers,
      });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const patchPost = createAsyncThunk(
  'editor/patchPost',
  async ({ id, body, headers }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await postAPI.patchPost({
        id,
        body,
        headers,
      });
      result = response.data;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

export const uploadHeaderImage = createAsyncThunk(
  'editor/uploadHeaderImage',
  async ({ formData, headers }, { rejectWithValue }) => {
    let result = null;
    try {
      const response = await imageAPI.uploadImage({ formData, headers });
      result = response;
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    return result;
  },
);

const initialState = {
  instance: null,
  title: '',
  introduce: '',
  selectedCategory: '',
  headerImage: '',
  headerImagePath: '',
  isPublic: true,
  content: [],
  author: '',
  notificationState: null,
  notificationMessage: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    changeValue: (state, { payload }) => {
      state[payload.target.name] = payload.target.value;
    },
    forcedChangeValue: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    resetNotificationState: (state) => {
      state.notificationState = null;
    },
    resetHeaderImageState: (state) => {
      state.headerImagePath = '';
      state.headerImage = '';
    },
    uploadImageState: (state, { payload }) => {
      const { result, message } = payload;
      state.notificationState = result;
      state.notificationMessage = message;
    },
  },
  extraReducers: (builder) => {
    // get the post data and puts the editor in that post data state
    builder.addCase(getRetrievePost.fulfilled, (state, { payload }) => {
      const { id, title, content, category, header_image, introduce, author } =
        payload;
      let headerImageName = '';
      if (header_image.includes(`${author}/${id}/`)) {
        headerImageName = header_image.replace(
          `${MEDIA_ROOT}/${author}/${id}/`,
          '',
        );
      } else {
        headerImageName = header_image.replace(`${MEDIA_ROOT}/`, '');
      }

      state = {
        ...state,
        title,
        introduce,
        selectedCategory: category,
        headerImagePath: header_image,
        headerImage: headerImageName,
        content: content.blocks,
      };
      localStorage.setItem('beingWrittenPostId', id);
      return state;
    });
    builder.addCase(getRetrievePost.rejected, (state) => {
      // if getPost rejected, when permissions do not exist
      state.notificationState = false;
      state.notificationMessage = '포스트를 가져오지 못했습니다.';
    });
    // when post create or save successful, the user check result through the notification value on the editor page
    // (notificationState, notificationMessage)
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      if (payload.is_finish) {
        // if is_finish state is true, redirect to generated post
        // redirect logic cannot be write in extraReducers
        localStorage.removeItem('beingWrittenPostId');
        return;
      }
      state.notificationState = true;
      state.notificationMessage = '포스트가 생성되었습니다.';
      localStorage.setItem('beingWrittenPostId', payload.id);
    });
    builder.addCase(createPost.rejected, (state) => {
      state.notificationState = false;
      state.notificationMessage = '포스트 생성에 실패하였습니다.';
    });
    builder.addCase(patchPost.fulfilled, (state, { payload }) => {
      if (payload.is_finish) {
        // same resons for createPost
        localStorage.removeItem('beingWrittenPostId');
        return;
      }
      state.notificationState = true;
      state.notificationMessage = '포스트가 저장되었습니다.';
    });
    builder.addCase(patchPost.rejected, (state) => {
      state.notificationState = false;
      state.notificationMessage = '포스트 저장에 실패하였습니다.';
    });
    builder.addCase(uploadHeaderImage.fulfilled, (state, { payload }) => {
      const { url, name } = payload.data.file;
      state['headerImagePath'] = url;
      state['headerImage'] = name;
    });
    builder.addCase(uploadHeaderImage.rejected, (_, actions) => {
      throw actions;
    });
  },
});

export const {
  changeValue,
  forcedChangeValue,
  resetNotificationState,
  resetHeaderImageState,
  uploadImageState,
} = editorSlice.actions;
export default editorSlice.reducer;
