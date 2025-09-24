import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/setting";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
  },
});
