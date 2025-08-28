import {useContext} from "react";
import AppContext from "../context/AppContext.jsx";


const PokemonListItem = ({ pokemon }) => {

    const {setSelectedPokemon} = useContext(AppContext);

    return (
        <div onClick={() => {
            setSelectedPokemon(pokemon.name)
        }} style={{
            width: "250px",
            backgroundColor: '#0e0e0e',
            borderRadius: '10px',
            cursor: "pointer",
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: pokemon.caught? '1px solid #00ee55': 'none',
            boxSizing: 'content-box',
        }}>
            <div>{pokemon.name}</div>
        </div>
    )
}

export default PokemonListItem;