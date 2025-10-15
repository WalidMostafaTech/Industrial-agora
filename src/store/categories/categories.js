import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMainCategories } from "../../services/homeServices";

const initialState = {
  categories: [],
  loading: true,
  error: null,
};

export const getMainCategoriesAct = createAsyncThunk(
  "categories/getMainCategoriesAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMainCategories();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMainCategoriesAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMainCategoriesAct.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getMainCategoriesAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب البيانات";
      });
  },
});

export const { clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
