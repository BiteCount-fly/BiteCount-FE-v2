"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Bell, ChevronRight, LogOut, Moon, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
  selectUserProfile,
  selectUserGoals,
  selectUserPreferences,
  toggleNotifications,
  toggleDarkMode,
} from "../store/slices/userSlice"

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUserProfile)
  const goals = useAppSelector(selectUserGoals)
  const preferences = useAppSelector(selectUserPreferences)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 py-4 bg-white border-b border-gray-100 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <User className="h-10 w-10 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">{profile.weight}</p>
                <p className="text-sm text-gray-500">kg</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{profile.height}</p>
                <p className="text-sm text-gray-500">cm</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{profile.bmi}</p>
                <p className="text-sm text-gray-500">BMI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">Goals</h3>
            <div>
              <Link to="/goals/calories" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Daily Calorie Goal</p>
                  <p className="text-sm text-gray-500">{goals.dailyCalories} kcal</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/goals/macros" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Macro Nutrients</p>
                  <p className="text-sm text-gray-500">
                    Protein: {goals.macros.protein}%, Carbs: {goals.macros.carbs}%, Fat: {goals.macros.fat}%
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/goals/weight" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Weight Goal</p>
                  <p className="text-sm text-gray-500">{goals.weightGoal}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">Preferences</h3>
            <div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="font-medium text-gray-800">Notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.notifications}
                    onChange={() => dispatch(toggleNotifications())}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="font-medium text-gray-800">Dark Mode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.darkMode}
                    onChange={() => dispatch(toggleDarkMode())}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">Account</h3>
            <div>
              <Link to="/account/personal" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Personal Information</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/account/password" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Change Password</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link to="/account/units" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Units & Measurements</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full py-3 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-600 font-medium flex items-center justify-center">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
