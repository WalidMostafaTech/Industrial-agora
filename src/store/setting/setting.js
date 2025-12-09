import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCities,
  getSettings,
  getTermsAndConditions,
} from "../../services/mainServices";

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

export const fetchCities = createAsyncThunk(
  "setting/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCities();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load config"
      );
    }
  }
);

export const fetchTerms = createAsyncThunk(
  "setting/fetchTerms",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTermsAndConditions();
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
    cities: [],
    terms: "",
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
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = action.payload;
      });
  },
});

export default appSetting.reducer;
