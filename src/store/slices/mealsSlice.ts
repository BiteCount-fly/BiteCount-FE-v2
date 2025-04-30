import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

export interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  servingSize: string
}

export interface Meal {
  id: string
  type: "breakfast" | "lunch" | "dinner" | "snack"
  time: string
  foods: {
    food: Food
    quantity: number
  }[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

interface MealsState {
  dailyMeals: Meal[]
  popularFoods: Food[]
  recentFoods: Food[]
  selectedMeal: string | null
  selectedMealType: "breakfast" | "lunch" | "dinner" | "snack"
  dailyCaloriesConsumed: number
}

const initialState: MealsState = {
  dailyMeals: [
    {
      id: "1",
      type: "breakfast",
      time: "8:30 AM",
      foods: [
        {
          food: {
            id: "101",
            name: "Avocado Toast",
            calories: 320,
            protein: 8,
            carbs: 32,
            fat: 16,
            servingSize: "2 slices, 1 avocado",
          },
          quantity: 1,
        },
      ],
      totalCalories: 320,
      totalProtein: 8,
      totalCarbs: 32,
      totalFat: 16,
    },
    {
      id: "2",
      type: "lunch",
      time: "12:45 PM",
      foods: [
        {
          food: {
            id: "102",
            name: "Chicken Salad",
            calories: 450,
            protein: 28,
            carbs: 18,
            fat: 12,
            servingSize: "Grilled chicken, mixed greens",
          },
          quantity: 1,
        },
      ],
      totalCalories: 450,
      totalProtein: 28,
      totalCarbs: 18,
      totalFat: 12,
    },
    {
      id: "3",
      type: "snack",
      time: "3:30 PM",
      foods: [
        {
          food: {
            id: "103",
            name: "Greek Yogurt",
            calories: 180,
            protein: 12,
            carbs: 24,
            fat: 4,
            servingSize: "With honey and berries",
          },
          quantity: 1,
        },
      ],
      totalCalories: 180,
      totalProtein: 12,
      totalCarbs: 24,
      totalFat: 4,
    },
    {
      id: "4",
      type: "dinner",
      time: "7:15 PM",
      foods: [
        {
          food: {
            id: "104",
            name: "Salmon with Quinoa",
            calories: 520,
            protein: 32,
            carbs: 42,
            fat: 18,
            servingSize: "Grilled salmon, quinoa, vegetables",
          },
          quantity: 1,
        },
      ],
      totalCalories: 520,
      totalProtein: 32,
      totalCarbs: 42,
      totalFat: 18,
    },
  ],
  popularFoods: [
    {
      id: "101",
      name: "Avocado Toast",
      calories: 320,
      protein: 8,
      carbs: 32,
      fat: 16,
      servingSize: "2 slices, 1 avocado",
    },
    {
      id: "103",
      name: "Greek Yogurt",
      calories: 180,
      protein: 12,
      carbs: 24,
      fat: 4,
      servingSize: "With honey and berries",
    },
    { id: "105", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: "100g" },
    { id: "106", name: "Salmon Fillet", calories: 206, protein: 22, carbs: 0, fat: 13, servingSize: "100g" },
    { id: "107", name: "Quinoa", calories: 120, protein: 4, carbs: 21, fat: 1.9, servingSize: "100g cooked" },
    { id: "108", name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: "1 medium" },
  ],
  recentFoods: [
    {
      id: "102",
      name: "Chicken Salad",
      calories: 450,
      protein: 28,
      carbs: 18,
      fat: 12,
      servingSize: "Grilled chicken, mixed greens",
    },
    {
      id: "109",
      name: "Protein Shake",
      calories: 220,
      protein: 25,
      carbs: 15,
      fat: 3,
      servingSize: "1 scoop with milk",
    },
    { id: "110", name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: "1 cup cooked" },
  ],
  selectedMeal: null,
  selectedMealType: "breakfast",
  dailyCaloriesConsumed: 1470, // Sum of all meals
}

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.dailyMeals.push(action.payload)
      state.dailyCaloriesConsumed += action.payload.totalCalories
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      const mealToRemove = state.dailyMeals.find((meal) => meal.id === action.payload)
      if (mealToRemove) {
        state.dailyCaloriesConsumed -= mealToRemove.totalCalories
        state.dailyMeals = state.dailyMeals.filter((meal) => meal.id !== action.payload)
      }
    },
    setSelectedMeal: (state, action: PayloadAction<string | null>) => {
      state.selectedMeal = action.payload
    },
    setSelectedMealType: (state, action: PayloadAction<"breakfast" | "lunch" | "dinner" | "snack">) => {
      state.selectedMealType = action.payload
    },
    addToRecentFoods: (state, action: PayloadAction<Food>) => {
      // Remove if already exists
      state.recentFoods = state.recentFoods.filter((food) => food.id !== action.payload.id)
      // Add to beginning of array
      state.recentFoods.unshift(action.payload)
      // Keep only the most recent 10
      if (state.recentFoods.length > 10) {
        state.recentFoods.pop()
      }
    },
  },
})

// Actions
export const { addMeal, removeMeal, setSelectedMeal, setSelectedMealType, addToRecentFoods } = mealsSlice.actions

// Selectors
export const selectDailyMeals = (state: RootState) => state.meals.dailyMeals
export const selectPopularFoods = (state: RootState) => state.meals.popularFoods
export const selectRecentFoods = (state: RootState) => state.meals.recentFoods
export const selectSelectedMeal = (state: RootState) => state.meals.selectedMeal
export const selectSelectedMealType = (state: RootState) => state.meals.selectedMealType
export const selectDailyCaloriesConsumed = (state: RootState) => state.meals.dailyCaloriesConsumed

// Derived selectors
export const selectMealByType = (state: RootState, type: "breakfast" | "lunch" | "dinner" | "snack") =>
  state.meals.dailyMeals.filter((meal) => meal.type === type)

export const selectSelectedFoodDetails = (state: RootState) => {
  const selectedMealId = state.meals.selectedMeal
  if (!selectedMealId) return null

  const food = [...state.meals.popularFoods, ...state.meals.recentFoods].find((f) => f.id === selectedMealId)
  return food || null
}

export default mealsSlice.reducer
