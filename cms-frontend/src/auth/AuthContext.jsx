import {createContext, useState} from "react"
import api from "../api/axios.js"

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const login = async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials)
            console.log("Login response:", response.data.access_token)
            const receivedToken = response.data.access_token;
            console.log("Login successful, received token:", receivedToken)

            if (receivedToken) {
                localStorage.setItem("token", receivedToken)
                setToken(receivedToken)
                return true
            }
        } catch (error) {
            console.error("Login attempt failed:", error)
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}