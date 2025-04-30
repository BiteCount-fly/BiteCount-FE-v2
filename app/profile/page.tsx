import Link from "next/link"
import { ArrowLeft, Bell, ChevronRight, LogOut, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 py-4 bg-white border-b border-gray-100 flex items-center">
        <Link href="/" className="mr-4">
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
              <h2 className="text-xl font-bold text-gray-800">Alex Johnson</h2>
              <p className="text-gray-500">alex.johnson@example.com</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">68.5</p>
                <p className="text-sm text-gray-500">kg</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">175</p>
                <p className="text-sm text-gray-500">cm</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">22.4</p>
                <p className="text-sm text-gray-500">BMI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">Goals</h3>
            <div>
              <Link href="/goals/calories" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Daily Calorie Goal</p>
                  <p className="text-sm text-gray-500">2,000 kcal</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/goals/macros" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Macro Nutrients</p>
                  <p className="text-sm text-gray-500">Protein: 25%, Carbs: 50%, Fat: 25%</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/goals/weight" className="flex items-center justify-between p-4 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Weight Goal</p>
                  <p className="text-sm text-gray-500">Maintain weight</p>
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
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-600 mr-3" />
                  <p className="font-medium text-gray-800">Dark Mode</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-sm font-medium text-gray-500 px-4 pt-4 pb-2">Account</h3>
            <div>
              <Link href="/account/personal" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Personal Information</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/account/password" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Change Password</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/account/units" className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="font-medium text-gray-800">Units & Measurements</p>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>
    </div>
  )
}
