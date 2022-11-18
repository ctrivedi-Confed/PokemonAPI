import React, { useEffect } from 'react'
import { Badge } from 'react-bootstrap';
import usePokemonTypeApi from '../hooks/usePokemonTypeApi'
import "../App.css"

const PokemonTypes = (props) => {
    const POKEMON_TYPE_URL = "https://pokeapi.co/api/v2/type";
    const types = usePokemonTypeApi(POKEMON_TYPE_URL);

    return (
        <div className='pokemonTypes'>
            <Badge bg="primary" name="all" data-url="https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0" onClick={props.changeClassFetchPokemons}>all</Badge>
            {
                types && types.map((type,index) => {
                    return (<Badge bg="secondary" name={type.name} data-url={type.url} key={index} onClick = {props.changeClassFetchPokemons}>{type.name}</Badge>)
                })
            }
        </div>
    )
}

export default PokemonTypes