import { useEffect, useState } from "react"
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon.jsx"
function PokemonList () {

    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

    const [nextUrl , setNexturl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')

    async function downloadPokemons(){
        setIsLoading(true)
        const response = await axios.get(pokedexUrl) // This downloads list of 20 pokemons

        const pokemonResults = response.data.results // we get the array of pokemons from result
        console.log(response.data);
        setNexturl(response.data.next)
        setPrevUrl(response.data.previous)
         
        // iterating  over the array of pokemons, and using their url to create an array of promise
        // that will download those 20 pokemons 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))

        // Passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise)
        console.log(pokemonData);
        const res =  pokemonData.map((pokeData)=> {
        const pokemon = pokeData.data
        return (
           {
            id: pokemon.id,
             name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            type: pokemon.types
            
        }
        )
        })
        console.log(res);
        setPokemonList(res)
        setIsLoading(false);
    }

    useEffect(()=>{
          downloadPokemons()
    },[pokedexUrl])

    return(
        
        <div className="pokemon-list-wrapper">
          <div className="pokemon-wrapper">
          {(isLoading) ? 'Loading...' : 
          pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
          } 
          </div>
          <div className="controls">
            <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
            <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
          </div>
         
        </div>
        
    )
  
    
}

export default PokemonList