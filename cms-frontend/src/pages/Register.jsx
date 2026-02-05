import {useState} from "react"
import api from "../api/axios.js"
import {useNavigate} from "react-router-dom"
import "../styles/Auth.css"
import {Link} from "react-router-dom"
import Footer from "../components/landing/Footer.jsx"

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess("")
        //Inject the role id to user
        const finalData = {...form, role_id: 3}
        try {
            await api.post("/register", finalData)
            setSuccess("Account created successfully. You can now log in")
            navigate("/login")
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Registration failed")
        } finally{
          setLoading(false)
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
                    <h1 className="auth-title">Create Your Account</h1>
                    <p className="auth-subtitle>">Join CleanFlow for quality services</p>
                  </div>
        
                  <div className="auth-body">
                    <form className="auth-form" onSubmit={handleSubmit}>
                      {success && (
                        <div className="success-alert">
                          {success}
                        </div>
                      )}
                    <div className="auth-input-group">
                      <label className="auth-label">Full Name</label>
                      <input
                        id="Full name"
                        type="text"
                        className="auth-input"
                        placeholder="Enter you full name"
                        required
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Email address</label>
                      <input
                        id="email"
                        type="email"
                        className="auth-input"
                        placeholder="Enter your email address"
                        required
                        onChange={(e) => setForm({...form, email: e.target.value})}
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
                        onChange={(e) => setForm({...form, password: e.target.value})}
                      />
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Confirm Password</label>
                      <input
                        id="password"
                        type="password"
                        className="auth-input"
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
                      />
                    </div>
        
                    <button type="submit" className="auth-submit" disabled={loading}>
                      {loading ? "Creating account..." : "Sign Up"}
                    </button>
                  </form>
                  </div>
        
                  <div className="auth-footer">
                    <p className="auth-footer-text">
                      Already have an account? <Link to="/login" className="auth-footer-link">Log In here</Link>
                    </p>
                    <Link to="/" className="auth-back-link">Back to Home</Link>
        
                  </div>
        
                </div>
              </div>
              <Footer />
            </div>

    )
}