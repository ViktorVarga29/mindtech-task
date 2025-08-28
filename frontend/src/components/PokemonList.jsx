import PokemonListItem from "./PokemonListItem.jsx";
import AppContext from "../context/AppContext.jsx";

const PokemonList = ({pokemons}) => {



    return (
        <div className="pokemon-list" style={{
            height: "fit-content",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: '10px',
            margin: '30px'
        }}>
            {pokemons.map(pokemon => <PokemonListItem pokemon={pokemon}></PokemonListItem>)}
        </div>
    )
}

export default PokemonList;