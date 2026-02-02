import {useState, useContext} from "react"
import {AuthContext} from "../auth/AuthContext.jsx"
import {useNavigate} from "react-router-dom"
import "../styles/Auth.css"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await login({email, password})
            
            if(user.role_id === 1){
                navigate("/dashboard")
            } else if(user.role_id === 2){
                navigate("/tasks")
            }else if(user.role_id === 3){
                navigate("/services")
            }else{
                alert("Invalid user")
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="auth-container">
      <div className="auth-card-container">
        <div className="auth-card">
          <header className="auth-header">
            <div className="brand-logo">CF</div>
            <div className="brand-tagline">Cleaning Management System</div>
          </header>

          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <footer className="auth-footer">
            Don’t have an account?
            <a href="/register" className="auth-link"> Create one</a>
          </footer>
        </div>
      </div>
    </div>
    )
}