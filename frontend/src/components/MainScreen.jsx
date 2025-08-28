import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PokemonList from "./PokemonList.jsx";
import PokemonCard from "./PokemonCard.jsx";
import AppContext from "../context/AppContext.jsx";

const MainScreen = () => {

    const [types, setTypes] = useState([]);
    const [listed, setListed] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [selectedType, setSelectedType] = useState({});
    const [search, setSearch] = useState("");
    const [allPokemons, setAllPokemons] = useState([])
    const [filterCaught, setFilterCaught] = useState(false)


    const {selectedPokemon, caught, setSavedToken} = useContext(AppContext)


    useEffect(() => {
        const getAllPokemons = async () => {
            let next = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
            const pokemonResult = []
            while (next) {
                const res = await axios.get(next)
                pokemonResult.push(...res.data.results)
                next = res.data.next
            }
            setAllPokemons(pokemonResult)
        }

        getAllPokemons()
    }, [])


    useEffect(() => {
        const getTypes = async () => {
            let next = 'https://pokeapi.co/api/v2/type/?limit=10'
            const typesResult = []
            while (next) {
                const res = await axios.get(next)
                typesResult.push(...res.data.results)
                next = res.data.next
            }
            setTypes([{name: 'no type selected', url: ''}, ...typesResult])
        }

        getTypes()
    })

    useEffect(() => {
        if (filterCaught) {
            setPokemons(listed.map(p => ({...p, caught: caught.includes(p.name)})).filter(p => p.caught))
        } else {
            setPokemons(listed.map(p => ({...p, caught: caught.includes(p.name)})))
        }

    }, [listed, caught, filterCaught]);


    useEffect(() => {
        if (selectedType.name !== 'no type selected') {
            setSearch('')
            axios.get(selectedType.url).then(res => setListed(res.data.pokemon.map(r => r.pokemon)))
        }
    }, [selectedType]);

    useEffect(() => {
        if (search) {
            setSelectedType({name: 'no type selected', url: ''})
            setListed(allPokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search])

    const handleChange = (event) => {
        setSelectedType(types.find(t => t.name === event.target.value));
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }


    if (!types && !allPokemons && !caught) {
        return <div>Loading...</div>
    }

    return (
        <>
            <button onClick={() => {
                localStorage.removeItem("token");
                setSavedToken('')
            }} style={{
                position: 'fixed',
                left: "10px",
                top: "10px",
            }}>Log out
            </button>
            <div style={{
                width: "100%",
                height: "100%",
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div style={{
                    flex: 1,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <div style={{
                        padding: "25px",
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <h2>Search Pokémons</h2>
                        <div style={{
                            width: "fit-content",
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '20px',
                            alignItems: 'center',
                        }}>

                            <div>
                                <label>by type: </label>
                                <select id="dropdown" value={selectedType.name} onChange={handleChange}>

                                    {types.map((type, index) => {
                                        return (
                                            <option key={index} value={type.name}>
                                                {type.name}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <h3 style={{margin: 0}}>or</h3>
                            <div>
                                <label>by name: </label>
                                <input type="text" onChange={(handleSearchChange)} value={search} placeholder='search'/>
                            </div>

                        </div>

                        <div>
                            <label>Show only my pokemons </label>
                            <input type="checkbox" onChange={(e) => setFilterCaught(e.target.checked)}
                                   checked={filterCaught}/>
                        </div>
                    </div>


                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#1a1a1a',
                    }}>
                        <PokemonList pokemons={pokemons}></PokemonList>
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#111',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {selectedPokemon && pokemons && pokemons.find(p => p.name === selectedPokemon) &&
                        <PokemonCard pokemon={pokemons.find(p => p.name === selectedPokemon)}></PokemonCard>
                    }
                </div>

            </div>
        </>

    )
}

export default MainScreen;