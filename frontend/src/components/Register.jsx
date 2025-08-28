import { useState } from "react"
import axios from "axios"

export const Register = () => {

    const apiUrl = import.meta.env.VITE_API_URL

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
    })

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()

        axios.post(apiUrl + '/signup', registerData).then(
            res => console.log(res.status)
        )

        setRegisterData({
            email: "",
            password: "",
        })
    }

    return (
        <div>
            <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2>Register</h2>

                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={registerData.email}
                    onChange={handleRegisterChange}
                />

                <input
                    type="password"
                    name='password'
                    placeholder='Password'
                    value={registerData.password}
                    onChange={handleRegisterChange}
                />

                <button type='submit'>Register</button>
            </form>
        </div>
    )
}