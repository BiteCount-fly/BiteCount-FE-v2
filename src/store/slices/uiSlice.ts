import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface UiState {
  activeTab: {
    stats: "weekly" | "monthly"
    addMeal: "popular" | "recent"
  }
  showSplashScreen: boolean
}

const initialState: UiState = {
  activeTab: {
    stats: "weekly",
    addMeal: "popular",
  },
  showSplashScreen: true,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setStatsTab: (state, action: PayloadAction<"weekly" | "monthly">) => {
      state.activeTab.stats = action.payload
    },
    setAddMealTab: (state, action: PayloadAction<"popular" | "recent">) => {
      state.activeTab.addMeal = action.payload
    },
    hideSplashScreen: (state) => {
      state.showSplashScreen = false
    },
  },
})

// Actions
export const { setStatsTab, setAddMealTab, hideSplashScreen } = uiSlice.actions

// Selectors
export const selectStatsTab = (state: RootState) => state.ui.activeTab.stats
export const selectAddMealTab = (state: RootState) => state.ui.activeTab.addMeal
export const selectShowSplashScreen = (state: RootState) => state.ui.showSplashScreen

export default uiSlice.reducer
