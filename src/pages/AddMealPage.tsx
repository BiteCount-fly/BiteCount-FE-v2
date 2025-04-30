"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Camera, Clock, Search } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
  selectPopularFoods,
  selectRecentFoods,
  selectSelectedMeal,
  selectSelectedMealType,
  setSelectedMeal,
  setSelectedMealType,
  addMeal,
  selectSelectedFoodDetails,
  addToRecentFoods,
} from "../store/slices/mealsSlice"
import { selectAddMealTab, setAddMealTab } from "../store/slices/uiSlice"
import { v4 as uuidv4 } from "uuid"

const AddMealPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const popularFoods = useAppSelector(selectPopularFoods)
  const recentFoods = useAppSelector(selectRecentFoods)
  const selectedMeal = useAppSelector(selectSelectedMeal)
  const selectedMealType = useAppSelector(selectSelectedMealType)
  const activeTab = useAppSelector(selectAddMealTab)
  const selectedFoodDetails = useAppSelector(selectSelectedFoodDetails)

  const [servingSize, setServingSize] = useState(1)
  const [mealTime, setMealTime] = useState("12:00")

  const handleSelectMeal = (foodId: string) => {
    dispatch(setSelectedMeal(foodId))
  }

  const handleSelectMealType = (type: "breakfast" | "lunch" | "dinner" | "snack") => {
    dispatch(setSelectedMealType(type))
  }

  const handleAddMeal = () => {
    if (selectedFoodDetails) {
      // Add to recent foods
      dispatch(addToRecentFoods(selectedFoodDetails))

      // Create new meal
      const newMeal = {
        id: uuidv4(),
        type: selectedMealType,
        time: formatTime(mealTime),
        foods: [
          {
            food: selectedFoodDetails,
            quantity: servingSize,
          },
        ],
        totalCalories: selectedFoodDetails.calories * servingSize,
        totalProtein: selectedFoodDetails.protein * servingSize,
        totalCarbs: selectedFoodDetails.carbs * servingSize,
        totalFat: selectedFoodDetails.fat * servingSize,
      }

      dispatch(addMeal(newMeal))
      navigate("/")
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-4 border-b border-gray-100 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Add Meal</h1>
      </header>

      <main className="flex-1 px-4 py-6 overflow-auto">
        {selectedMeal ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://via.placeholder.com/64"
                    alt={selectedFoodDetails?.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-gray-800">{selectedFoodDetails?.name}</h2>
                  <p className="text-sm text-gray-500">1 serving</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{selectedFoodDetails?.calories}</p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-semibold text-gray-800">{selectedFoodDetails?.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-semibold text-gray-800">{selectedFoodDetails?.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-semibold text-gray-800">{selectedFoodDetails?.fat}g</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["breakfast", "lunch", "dinner", "snack"].map((type) => (
                    <button
                      key={type}
                      className={`py-2 px-4 rounded-lg text-sm font-medium capitalize ${
                        selectedMealType === type
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-50 text-gray-700 border border-gray-100"
                      }`}
                      onClick={() => handleSelectMealType(type as any)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full pl-10 py-2 border border-gray-200 rounded-lg"
                    value={mealTime}
                    onChange={(e) => setMealTime(e.target.value)}
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
                <div className="flex items-center">
                  <button
                    className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => setServingSize(Math.max(0.5, servingSize - 0.5))}
                  >
                    <span className="text-gray-600">-</span>
                  </button>
                  <div className="mx-4 flex-1 text-center">
                    <span className="font-medium text-gray-800">{servingSize} serving</span>
                  </div>
                  <button
                    className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => setServingSize(servingSize + 0.5)}
                  >
                    <span className="text-gray-600">+</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
              onClick={handleAddMeal}
            >
              Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search for food..."
                  className="w-full pl-10 py-3 bg-gray-50 border-gray-100 rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Quick Add</h2>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Camera className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs text-gray-700 text-center">Scan</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 text-center">Create</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <svg
                    className="h-5 w-5 text-purple-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 text-center">Recipe</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <svg
                    className="h-5 w-5 text-yellow-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 text-center">Info</span>
              </button>
            </div>

            <div className="w-full mb-4">
              <div className="grid w-full grid-cols-2 mb-4">
                <button
                  className={`py-2 text-center font-medium ${
                    activeTab === "popular"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "border-b border-gray-200 text-gray-500"
                  }`}
                  onClick={() => dispatch(setAddMealTab("popular"))}
                >
                  Popular
                </button>
                <button
                  className={`py-2 text-center font-medium ${
                    activeTab === "recent"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "border-b border-gray-200 text-gray-500"
                  }`}
                  onClick={() => dispatch(setAddMealTab("recent"))}
                >
                  Recent
                </button>
              </div>

              <div className="space-y-3">
                {activeTab === "popular"
                  ? popularFoods.map((food) => (
                      <button
                        key={food.id}
                        className="w-full flex items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                        onClick={() => handleSelectMeal(food.id)}
                      >
                        <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src="https://via.placeholder.com/48"
                            alt={food.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-800">{food.name}</p>
                          <p className="text-xs text-gray-500">1 serving</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{food.calories}</p>
                          <p className="text-xs text-gray-500">kcal</p>
                        </div>
                      </button>
                    ))
                  : recentFoods.map((food) => (
                      <button
                        key={food.id}
                        className="w-full flex items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                        onClick={() => handleSelectMeal(food.id)}
                      >
                        <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src="https://via.placeholder.com/48"
                            alt={food.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-800">{food.name}</p>
                          <p className="text-xs text-gray-500">1 serving</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{food.calories}</p>
                          <p className="text-xs text-gray-500">kcal</p>
                        </div>
                      </button>
                    ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AddMealPage
