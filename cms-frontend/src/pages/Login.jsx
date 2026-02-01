import {useState, useContext} from "react"
import {AuthContext} from "../auth/AuthContext.jsx"
import {useNavigate} from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login({email, password})
            navigate("/dashboard")
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Login failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}