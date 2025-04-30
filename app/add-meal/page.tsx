"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AddMealPage() {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null)
  const [mealType, setMealType] = useState("breakfast")

  const popularFoods = [
    { name: "Avocado Toast", calories: 320, protein: 8, carbs: 32, fat: 16 },
    { name: "Greek Yogurt", calories: 180, protein: 12, carbs: 24, fat: 4 },
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Salmon Fillet", calories: 206, protein: 22, carbs: 0, fat: 13 },
    { name: "Quinoa", calories: 120, protein: 4, carbs: 21, fat: 1.9 },
    { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  ]

  const recentFoods = [
    { name: "Chicken Salad", calories: 450, protein: 28, carbs: 18, fat: 12 },
    { name: "Protein Shake", calories: 220, protein: 25, carbs: 15, fat: 3 },
    { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 2.5 },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-4 border-b border-gray-100 flex items-center">
        <Link href="/" className="mr-4">
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
                    src="/placeholder.svg?height=64&width=64"
                    alt={selectedMeal}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-gray-800">{selectedMeal}</h2>
                  <p className="text-sm text-gray-500">1 serving</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {popularFoods.find((f) => f.name === selectedMeal)?.calories ||
                      recentFoods.find((f) => f.name === selectedMeal)?.calories}
                  </p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-semibold text-gray-800">
                      {popularFoods.find((f) => f.name === selectedMeal)?.protein ||
                        recentFoods.find((f) => f.name === selectedMeal)?.protein}
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-semibold text-gray-800">
                      {popularFoods.find((f) => f.name === selectedMeal)?.carbs ||
                        recentFoods.find((f) => f.name === selectedMeal)?.carbs}
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-semibold text-gray-800">
                      {popularFoods.find((f) => f.name === selectedMeal)?.fat ||
                        recentFoods.find((f) => f.name === selectedMeal)?.fat}
                      g
                    </p>
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
                        mealType === type
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-50 text-gray-700 border border-gray-100"
                      }`}
                      onClick={() => setMealType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <div className="relative">
                  <Input type="time" className="pl-10" defaultValue="12:00" />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
                <div className="flex items-center">
                  <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600">-</span>
                  </button>
                  <div className="mx-4 flex-1 text-center">
                    <span className="font-medium text-gray-800">1 serving</span>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600">+</span>
                  </button>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search for food..." className="pl-10 bg-gray-50 border-gray-100" />
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

            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="space-y-3">
                {popularFoods.map((food) => (
                  <button
                    key={food.name}
                    className="w-full flex items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                    onClick={() => setSelectedMeal(food.name)}
                  >
                    <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
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
              </TabsContent>
              <TabsContent value="recent" className="space-y-3">
                {recentFoods.map((food) => (
                  <button
                    key={food.name}
                    className="w-full flex items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                    onClick={() => setSelectedMeal(food.name)}
                  >
                    <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
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
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
