import AppContext from "./AppContext.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const AppProvider = ({children}) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [savedToken, setSavedToken] = useState('')

    const [caught, setCaught] = useState([])





    useEffect(() => {
        if (savedToken) {
            console.log(savedToken)
            axios.get(apiUrl + '/list', {headers: {'Authorization': savedToken}}).then(res => setCaught(res.data.catches))
        }
    }, [savedToken])

    useEffect(() => {
        console.log('caught', caught)
    }, [caught]);


    useEffect(() => {
        console.log('selected pokemon', selectedPokemon);
    }, [selectedPokemon]);

    return (
        <AppContext.Provider value={{
            selectedPokemon, setSelectedPokemon,
            savedToken, setSavedToken,
            caught, setCaught,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;