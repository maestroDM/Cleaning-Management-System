import {useState, useContext} from "react"
import {AuthContext} from "../auth/AuthContext.jsx"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import Footer from "../components/landing/Footer.jsx" 
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link className = "auth-logo" to="/">
              <span className="auth-logo-text">CleanFlow</span>
            </Link>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle>">Sign in to access services</p>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label className="auth-label">Email address</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="Enter your email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <input
                id="password"
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit">
              Log In
            </button>
          </form>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don’t have an account? <Link to="/register" className="auth-footer-link">Sign up here</Link>
            </p>
            <Link to="/" className="auth-back-link">Back to Home</Link>

          </div>

        </div>
      </div>
      <Footer />
    </div>
    
  

  )
}