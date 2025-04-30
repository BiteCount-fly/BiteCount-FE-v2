import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface UserState {
  profile: {
    name: string
    email: string
    weight: number
    height: number
    bmi: number
  }
  goals: {
    dailyCalories: number
    macros: {
      protein: number
      carbs: number
      fat: number
    }
    weightGoal: string
  }
  preferences: {
    notifications: boolean
    darkMode: boolean
  }
}

const initialState: UserState = {
  profile: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    weight: 68.5,
    height: 175,
    bmi: 22.4,
  },
  goals: {
    dailyCalories: 2000,
    macros: {
      protein: 25,
      carbs: 50,
      fat: 25,
    },
    weightGoal: "Maintain weight",
  },
  preferences: {
    notifications: true,
    darkMode: false,
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserState["profile"]>>) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    updateGoals: (state, action: PayloadAction<Partial<UserState["goals"]>>) => {
      state.goals = { ...state.goals, ...action.payload }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState["preferences"]>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    toggleNotifications: (state) => {
      state.preferences.notifications = !state.preferences.notifications
    },
    toggleDarkMode: (state) => {
      state.preferences.darkMode = !state.preferences.darkMode
    },
  },
})

// Actions
export const { updateProfile, updateGoals, updatePreferences, toggleNotifications, toggleDarkMode } = userSlice.actions

// Selectors
export const selectUserProfile = (state: RootState) => state.user.profile
export const selectUserGoals = (state: RootState) => state.user.goals
export const selectUserPreferences = (state: RootState) => state.user.preferences

export default userSlice.reducer
