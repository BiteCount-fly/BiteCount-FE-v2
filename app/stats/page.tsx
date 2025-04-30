"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StatsPage() {
  const weeklyData = [
    { day: "Mon", calories: 1850, goal: 2000 },
    { day: "Tue", calories: 1920, goal: 2000 },
    { day: "Wed", calories: 2100, goal: 2000 },
    { day: "Thu", calories: 1750, goal: 2000 },
    { day: "Fri", calories: 1830, goal: 2000 },
    { day: "Sat", calories: 2200, goal: 2000 },
    { day: "Sun", calories: 1950, goal: 2000 },
  ]

  const monthlyData = [
    { week: "Week 1", calories: 1920, goal: 2000 },
    { week: "Week 2", calories: 1850, goal: 2000 },
    { week: "Week 3", calories: 1980, goal: 2000 },
    { week: "Week 4", calories: 1890, goal: 2000 },
  ]

  const macroData = [
    { name: "Protein", value: 25, color: "#3b82f6" },
    { name: "Carbs", value: 50, color: "#f59e0b" },
    { name: "Fat", value: 25, color: "#ef4444" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 py-4 bg-white border-b border-gray-100 flex items-center">
        <Link href="/" className="mr-4">
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
            <div className="text-sm text-gray-500">Daily Avg: 1,943 kcal</div>
          </div>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <div className="h-64">
                <ChartContainer
                  config={{
                    calories: {
                      label: "Calories",
                      color: "hsl(var(--chart-1))",
                    },
                    goal: {
                      label: "Goal",
                      color: "hsl(var(--chart-5))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="calories" fill="var(--color-calories)" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="h-64">
                <ChartContainer
                  config={{
                    calories: {
                      label: "Calories",
                      color: "hsl(var(--chart-1))",
                    },
                    goal: {
                      label: "Goal",
                      color: "hsl(var(--chart-5))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="calories" fill="var(--color-calories)" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Macro Distribution</h2>
              <Link href="/stats/macros" className="text-green-600 text-sm font-medium flex items-center">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {macroData.map((item, index) => {
                    const startAngle =
                      index === 0 ? 0 : macroData.slice(0, index).reduce((sum, d) => sum + d.value, 0) * 3.6
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
              {macroData.map((item) => (
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
              <Link href="/stats/meals" className="text-green-600 text-sm font-medium flex items-center">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-800">Breakfast</p>
                  <p className="text-sm font-medium text-gray-800">320 kcal</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "25%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">25% of daily intake</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-800">Lunch</p>
                  <p className="text-sm font-medium text-gray-800">450 kcal</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">35% of daily intake</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-800">Snack</p>
                  <p className="text-sm font-medium text-gray-800">180 kcal</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "15%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">15% of daily intake</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-800">Dinner</p>
                  <p className="text-sm font-medium text-gray-800">520 kcal</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">40% of daily intake</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
