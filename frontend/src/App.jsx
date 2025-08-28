import {useContext, useEffect, useState} from 'react'
import './App.css'
import AppContext from "./context/AppContext.jsx";
import MainScreen from "./components/MainScreen.jsx";
import LoginScreen from "./components/LoginScreen.jsx";

function App() {

    const {setSavedToken, savedToken} = useContext(AppContext)

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            setSavedToken(token);
        } catch (err) {
            console.error("Error reading localStorage:", err);
            localStorage.removeItem("token");
        }
    }, []);


    if (savedToken) {
        return <div style={{
            width: '100%',
            height: '100%',
        }}>
            <MainScreen></MainScreen>
        </div>
    }

    return (
        <div>
            <LoginScreen></LoginScreen>
        </div>
    )
}

export default App
