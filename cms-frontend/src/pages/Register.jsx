import {useState} from "react"
import api from "../api/axios.js"
import {useNavigate} from "react-router-dom"

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
        <div className="register-container">
            <form>
                <h2>Create Account</h2>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} />

                <p>Register as:</p>
                <div className="flex gap-4">
                    <button type="button" onClick={(e) => handleSubmit(e, 2)}>Staff</button>
                    <button type="button" onClick={(e) => handleSubmit(e, 3)}>User</button>
                </div>
            </form>
        </div>
        
    )
}