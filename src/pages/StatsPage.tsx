"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
  selectWeeklyData,
  selectMonthlyData,
  selectMacroDistribution,
  selectMealDistribution,
  selectDailyAverage,
} from "../store/slices/statsSlice"
import { selectStatsTab, setStatsTab } from "../store/slices/uiSlice"

const StatsPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const weeklyData = useAppSelector(selectWeeklyData)
  const monthlyData = useAppSelector(selectMonthlyData)
  const macroDistribution = useAppSelector(selectMacroDistribution)
  const mealDistribution = useAppSelector(selectMealDistribution)
  const dailyAverage = useAppSelector(selectDailyAverage)
  const activeTab = useAppSelector(selectStatsTab)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 py-4 bg-white border-b border-gray-100 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Statistics</h1>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <div className="mx-4 flex items-center">
              <Calendar className="h-4 w-4 text-gray-600 mr-2" />
              <span className="font-medium text-gray-800">April 2025</span>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Calorie Summary</h2>
            <div className="text-sm text-gray-500">Daily Avg: {dailyAverage} kcal</div>
          </div>

          <div className="w-full mb-4">
            <div className="grid w-full grid-cols-2 mb-4">
              <button
                className={`py-2 text-center font-medium ${
                  activeTab === "weekly"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "border-b border-gray-200 text-gray-500"
                }`}
                onClick={() => dispatch(setStatsTab("weekly"))}
              >
                Weekly
              </button>
              <button
                className={`py-2 text-center font-medium ${
                  activeTab === "monthly"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "border-b border-gray-200 text-gray-500"
                }`}
                onClick={() => dispatch(setStatsTab("monthly"))}
              >
                Monthly
              </button>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activeTab === "weekly" ? weeklyData : monthlyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey={activeTab === "weekly" ? "day" : "week"} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value: number) => [`${value} kcal`, "Calories"]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar
                    dataKey="calories"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    barSize={activeTab === "weekly" ? 30 : 40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Macro Distribution</h2>
              <Link to="/stats/macros" className="text-green-600 text-sm font-medium flex items-center">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {macroDistribution.map((item, index) => {
                    const startAngle =
                      index === 0 ? 0 : macroDistribution.slice(0, index).reduce((sum, d) => sum + d.value, 0) * 3.6
                    const endAngle = startAngle + item.value * 3.6

                    const startRad = ((startAngle - 90) * Math.PI) / 180
                    const endRad = ((endAngle - 90) * Math.PI) / 180

                    const x1 = 50 + 40 * Math.cos(startRad)
                    const y1 = 50 + 40 * Math.sin(startRad)
                    const x2 = 50 + 40 * Math.cos(endRad)
                    const y2 = 50 + 40 * Math.sin(endRad)

                    const largeArcFlag = item.value > 50 ? 1 : 0

                    return (
                      <path
                        key={item.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                      />
                    )
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">100%</p>
                    <p className="text-xs text-gray-500">of goal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {macroDistribution.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-xs text-gray-500">{item.name}</p>
                    <p className="text-sm font-medium text-gray-800">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Meal Distribution</h2>
              <Link to="/stats/meals" className="text-green-600 text-sm font-medium flex items-center">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="space-y-4 mt-4">
              {mealDistribution.map((item) => (
                <div key={item.meal}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-800">{item.meal}</p>
                    <p className="text-sm font-medium text-gray-800">{item.calories} kcal</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.percentage}% of daily intake</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StatsPage
