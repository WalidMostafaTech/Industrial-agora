import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/setting";
import profileReducer from "./profile/profileSlice";
import categoriesReducer from "./categories/categories";
import languageReducer from "./languageSlice/languageSlice";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    language: languageReducer,
  },
});
