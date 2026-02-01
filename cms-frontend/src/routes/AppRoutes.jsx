import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import RequireAuth from "../auth/RequireAuth.jsx"

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
            path="/dashboard"
            element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            }
        />
    </Routes>
  )
}