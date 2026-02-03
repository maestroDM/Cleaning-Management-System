import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import RequireAuth from "../auth/RequireAuth.jsx"
import Tasks from "../pages/Tasks.jsx"
import Services from "../pages/Services.jsx"
import Unauthorized from "../pages/Unauthorized.jsx"
import BookService from "../pages/BookService.jsx"

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
            path="/dashboard"
            element={
                <RequireAuth allowedRoles={[1]}>
                    <Dashboard />
                </RequireAuth>
            }
        />
        <Route path="/tasks" element={
            <RequireAuth allowedRoles={[2]}>
                <Tasks />
            </RequireAuth>
        } />
        <Route path="/services" element={
            <RequireAuth allowedRoles={[3]}>
                <Services />
            </RequireAuth>
        } />

        <Route path="/services/:serviceId/book" element={
            <RequireAuth allowedRoles={[3]}>
                <BookService />
            </RequireAuth>
        } />
    </Routes>
  )
}