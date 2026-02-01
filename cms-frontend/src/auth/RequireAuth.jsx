import {useContext} from "react"
import {Navigate} from "react-router-dom"
import {AuthContext} from "./AuthContext"

export default function RequireAuth({children, allowedRoles}) {
    const {token, user} = useContext(AuthContext)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user?.role_id)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}