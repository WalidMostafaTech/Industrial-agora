import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettings } from "../../services/homeServices";

export const fetchSetting = createAsyncThunk(
  "setting/fetchSetting",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSettings();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load config"
      );
    }
  }
);

const appSetting = createSlice({
  name: "setting",
  initialState: {
    setting: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload;
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default appSetting.reducer;
