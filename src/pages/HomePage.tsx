"use client"

import type React from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Home, PieChart, Plus, Settings, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectDailyMeals, selectDailyCaloriesConsumed } from "../store/slices/mealsSlice"
import { selectUserGoals } from "../store/slices/userSlice"
import { hideSplashScreen, selectShowSplashScreen } from "../store/slices/uiSlice"

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const showSplashScreen = useAppSelector(selectShowSplashScreen)
  const dailyMeals = useAppSelector(selectDailyMeals)
  const caloriesConsumed = useAppSelector(selectDailyCaloriesConsumed)
  const userGoals = useAppSelector(selectUserGoals)

  useEffect(() => {
    // Hide splash screen after 1.5 seconds
    const timer = setTimeout(() => {
      dispatch(hideSplashScreen())
    }, 1500)

    return () => clearTimeout(timer)
  }, [dispatch])

  // Calculate percentage of daily goal
  const caloriePercentage = Math.round((caloriesConsumed / userGoals.dailyCalories) * 100)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Splash Screen */}
      {showSplashScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 transition-all duration-1000 animate-[fadeOut_1s_ease-in-out_forwards_1.5s]">
          <div className="flex flex-col items-center justify-center space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-green-500 font-bold text-xl">BC</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-600 tracking-tight">BITECOUNT</h1>
            <p className="text-green-600/80 text-sm">Track every bite, achieve your goals</p>
          </div>
        </div>
      )}

      {/* Main App */}
      <header className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-600">BITECOUNT</h1>
            <p className="text-sm text-gray-500">Wednesday, April 30</p>
          </div>
          <Link to="/profile" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 overflow-auto">
        {/* Daily Summary */}
        <section className="mb-8">
          <div className="bg-green-50 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Summary</h2>
              <Link to="/details" className="text-green-600 text-sm font-medium flex items-center">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-gray-800">{caloriesConsumed}</span>
                  <span className="text-sm text-gray-500 ml-1 mb-1">/ {userGoals.dailyCalories} kcal</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${caloriePercentage}%` }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0</span>
                  <span>{userGoals.dailyCalories}</span>
                </div>
              </div>

              <div className="ml-6 flex flex-col items-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-green-500"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                      clip: `rect(0px, 64px, 64px, ${32 + (32 * caloriePercentage) / 100}px)`,
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-800">{caloriePercentage}%</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1">Remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="text-lg font-semibold text-gray-800">48g</p>
                <div className="h-1 bg-gray-100 rounded-full mt-2">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="text-lg font-semibold text-gray-800">156g</p>
                <div className="h-1 bg-gray-100 rounded-full mt-2">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">Fat</p>
                <p className="text-lg font-semibold text-gray-800">42g</p>
                <div className="h-1 bg-gray-100 rounded-full mt-2">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "52%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Meals */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Meals</h2>
            <Link to="/meals" className="text-green-600 text-sm font-medium flex items-center">
              All meals <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {dailyMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800">
                    {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                  </h3>
                  <span className="text-sm text-gray-500">{meal.time}</span>
                </div>
                {meal.foods.map((foodItem, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-14 w-14 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`https://via.placeholder.com/56`}
                        alt={foodItem.food.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-800">{foodItem.food.name}</p>
                      <p className="text-sm text-gray-500">{foodItem.food.servingSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{foodItem.food.calories}</p>
                      <p className="text-xs text-gray-500">kcal</p>
                    </div>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Protein: {meal.totalProtein}g</span>
                    <span className="text-gray-500">Carbs: {meal.totalCarbs}g</span>
                    <span className="text-gray-500">Fat: {meal.totalFat}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Progress */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Progress</h2>
            <Link to="/stats" className="text-green-600 text-sm font-medium flex items-center">
              Full report <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Apr 24 - Apr 30</p>
                <p className="font-medium text-gray-800">Daily Average: 1,876 kcal</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Goal: 2,000 kcal</p>
                <p className="font-medium text-green-600">-124 kcal/day</p>
              </div>
            </div>

            <div className="h-40 flex items-end justify-between space-x-2">
              {[65, 85, 95, 75, 60, 80, 62].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-100 rounded-t-sm" style={{ height: `${height}%` }}>
                    <div
                      className="w-full bg-green-500 h-full rounded-t-sm"
                      style={{ opacity: index === 6 ? 1 : 0.6 }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{["M", "T", "W", "T", "F", "S", "S"][index]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-100 bg-white">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center justify-center text-green-600">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/stats" className="flex flex-col items-center justify-center text-gray-400">
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Stats</span>
          </Link>
          <div className="relative -mt-6">
            <Link
              to="/add-meal"
              className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
            >
              <Plus className="h-6 w-6 text-white" />
            </Link>
          </div>
          <Link to="/meals" className="flex flex-col items-center justify-center text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-xs mt-1">Meals</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center text-gray-400">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
