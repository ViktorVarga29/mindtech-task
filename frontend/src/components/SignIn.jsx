import { useState, useContext } from "react"
import AppContext from "../context/AppContext"
import axios from "axios"

export const SignIn = () => {

    const apiUrl = import.meta.env.VITE_API_URL

    const { setSavedToken } = useContext(AppContext)
    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    })

    const handleSigninChange = (e) => {
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value
        })
    }

    const handleSigninSubmit = (e) => {
        e.preventDefault()

        axios.post(apiUrl + '/login', signinData).then(
            res => {
                localStorage.setItem('token', res.data.token)
                setSavedToken(localStorage.getItem('token'))
            }
        )
    }

    return (
        <div>
            <form onSubmit={handleSigninSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2>Sign in</h2>

                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={signinData.email}
                    onChange={handleSigninChange}
                />

                <input
                    type="password"
                    name='password'
                    placeholder='Password'
                    value={signinData.password}
                    onChange={handleSigninChange}
                />

                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}