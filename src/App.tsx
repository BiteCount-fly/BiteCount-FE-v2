import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import HomePage from "./pages/HomePage"
import AddMealPage from "./pages/AddMealPage"
import ProfilePage from "./pages/ProfilePage"
import StatsPage from "./pages/StatsPage"
import "./index.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-meal" element={<AddMealPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
