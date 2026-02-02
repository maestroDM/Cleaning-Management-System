import {useState} from "react"
import api from "../api/axios.js"
import {useNavigate} from "react-router-dom"
import "../styles/Auth.css"

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e, roleId) => {
        e.preventDefault()
        //Inject the role id based on which button was clicked
        const finalData = {...form, role_id: roleId}
        try {
            await api.post("/register", finalData)
            navigate("/login")
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Registration failed")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Register</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            placeholder="Name"
                            onChange={(e) => setForm({...form, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setForm({...form, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setForm({...form, password: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
                        />
                    </div>
                    <p>Register as:</p>
                    <div className="flex gap-4">
                        <button type="button" onClick={(e) => handleSubmit(e, 2)}>Staff</button>
                        <button type="button" onClick={(e) => handleSubmit(e, 3)}>User</button>
                    </div>
                </form>
                <p className="auth-footer">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    )
}