import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface DailyStats {
  date: string
  calories: number
  goal: number
  protein: number
  carbs: number
  fat: number
  mealDistribution: {
    breakfast: number
    lunch: number
    snack: number
    dinner: number
  }
}

interface StatsState {
  weeklyData: {
    day: string
    calories: number
    goal: number
  }[]
  monthlyData: {
    week: string
    calories: number
    goal: number
  }[]
  macroDistribution: {
    name: string
    value: number
    color: string
  }[]
  mealDistribution: {
    meal: string
    calories: number
    percentage: number
    color: string
  }[]
  dailyStats: DailyStats[]
  currentDate: string
}

const initialState: StatsState = {
  weeklyData: [
    { day: "Mon", calories: 1850, goal: 2000 },
    { day: "Tue", calories: 1920, goal: 2000 },
    { day: "Wed", calories: 2100, goal: 2000 },
    { day: "Thu", calories: 1750, goal: 2000 },
    { day: "Fri", calories: 1830, goal: 2000 },
    { day: "Sat", calories: 2200, goal: 2000 },
    { day: "Sun", calories: 1950, goal: 2000 },
  ],
  monthlyData: [
    { week: "Week 1", calories: 1920, goal: 2000 },
    { week: "Week 2", calories: 1850, goal: 2000 },
    { week: "Week 3", calories: 1980, goal: 2000 },
    { week: "Week 4", calories: 1890, goal: 2000 },
  ],
  macroDistribution: [
    { name: "Protein", value: 25, color: "#3b82f6" },
    { name: "Carbs", value: 50, color: "#f59e0b" },
    { name: "Fat", value: 25, color: "#ef4444" },
  ],
  mealDistribution: [
    { meal: "Breakfast", calories: 320, percentage: 25, color: "#10b981" },
    { meal: "Lunch", calories: 450, percentage: 35, color: "#3b82f6" },
    { meal: "Snack", calories: 180, percentage: 15, color: "#f59e0b" },
    { meal: "Dinner", calories: 520, percentage: 40, color: "#8b5cf6" },
  ],
  dailyStats: [
    {
      date: "2025-04-30",
      calories: 1470,
      goal: 2000,
      protein: 80,
      carbs: 116,
      fat: 50,
      mealDistribution: {
        breakfast: 320,
        lunch: 450,
        snack: 180,
        dinner: 520,
      },
    },
  ],
  currentDate: "2025-04-30",
}

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    updateDailyStats: (state, action) => {
      const existingStatIndex = state.dailyStats.findIndex((stat) => stat.date === action.payload.date)

      if (existingStatIndex >= 0) {
        state.dailyStats[existingStatIndex] = {
          ...state.dailyStats[existingStatIndex],
          ...action.payload,
        }
      } else {
        state.dailyStats.push(action.payload)
      }
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload
    },
  },
})

// Actions
export const { updateDailyStats, setCurrentDate } = statsSlice.actions

// Selectors
export const selectWeeklyData = (state: RootState) => state.stats.weeklyData
export const selectMonthlyData = (state: RootState) => state.stats.monthlyData
export const selectMacroDistribution = (state: RootState) => state.stats.macroDistribution
export const selectMealDistribution = (state: RootState) => state.stats.mealDistribution
export const selectCurrentDateStats = (state: RootState) => {
  const currentDate = state.stats.currentDate
  return state.stats.dailyStats.find((stat) => stat.date === currentDate) || null
}
export const selectDailyAverage = (state: RootState) => {
  const weeklyData = state.stats.weeklyData
  const total = weeklyData.reduce((sum, day) => sum + day.calories, 0)
  return Math.round(total / weeklyData.length)
}

export default statsSlice.reducer
