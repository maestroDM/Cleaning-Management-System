import {createContext, useState} from "react"
import api from "../api/axios.js"

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const login = async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials)
            console.log("Login response:", response.data.access_token)
            const receivedToken = response.data.access_token;
            console.log("Login successful, received token:", receivedToken)

            if (receivedToken) {
                localStorage.setItem("token", receivedToken)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setToken(receivedToken)
                setUser(response.data.user)
                return response.data.user
                return true
            }
        } catch (error) {
            console.error("Login attempt failed:", error)
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{token, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}