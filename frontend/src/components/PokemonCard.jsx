import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AppContext from "../context/AppContext.jsx";

const PokemonCard = ({pokemon}) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const [data, setData] = useState(null);
    const {savedToken, setCaught} = useContext(AppContext);

    useEffect(() => {
        axios.get(pokemon.url).then((response) => {
            setData(response.data)
        });
    }, [pokemon]);

    useEffect(() => {
        if (data) {
            console.log(data.sprites.front_default);
        }
    }, [data])

    return (
        <div style={{
            maxWidth: '400px',
            height: '500px',
            width: '90%',
            backgroundColor: '#f3f3f3',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#444'
        }}>
            {data && <div style={{
                width: 'fit-content',
            }}>
                <img src={data.sprites.front_default} alt=""/>
                <h3>{data.name}</h3>
                <p>Height: {data.height}</p>
                <p>Weight: {data.weight}</p>

                {pokemon.caught ? (
                    <button onClick={() => {
                    axios.post(apiUrl + '/release', {pokemon: pokemon.name}, {headers:{Authorization: savedToken}}).then(
                        () => axios.get(apiUrl + '/list', {headers: {'Authorization': savedToken}}).then(res => setCaught(res.data.catches))
                    )
                }} style={{background:'#444'}}>Release</button>
                ): (
                    <button onClick={() => {
                        axios.post(apiUrl + '/catch', {pokemon: pokemon.name}, {headers: {Authorization: savedToken}}).then(
                            () => axios.get(apiUrl + '/list', {headers: {'Authorization': savedToken}}).then(res => setCaught(res.data.catches))
                        )
                    }} style={{background:'#444'}}>Catch</button>
                )}
            </div>}

        </div>
    )
}

export default PokemonCard;