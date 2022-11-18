import React, { useState } from 'react';
import usePokemonApi from '../hooks/usePokemonApi';
import Header from "../components/Header";
import PokemonTypes from '../components/PokemonTypes';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ConfirmModal from '../components/ConfirmModal';
import Alert from 'react-bootstrap/Alert'

const Pokemon = () => {
  const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const [pokemons, setPokemons] = usePokemonApi(POKEMON_URL);
  const [searchInput, setSearchInput] = useState("");
  const [currentType, setCurrentType] = useState("all");
  const [currentPokemon, setCurrentPokemon] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [show, setShow] = useState(true);

  const changeClassFetchPokemons = (e) => {
    setCurrentType(e.target.innerText);
    
    const findSelectedType = document.getElementsByClassName("bg-primary")[0];
    findSelectedType.classList = "badge bg-secondary";
    
    e.target.classList = "badge bg-primary";

    if(e.target.innerText === "all"){
      axios.get(e.target.dataset.url)
        .then((data) =>{ setPokemons(data.data.results) });
    } else {
      axios.get(e.target.dataset.url)
        .then((res) => { 
          let convertedPokemons = res.data.pokemon.map((p, i)=> p.pokemon);
          setPokemons(Object.values(convertedPokemons));
      });
    }
  }

  const checkForSubmittion = function() {
    if(localStorage.getItem("formData") !== null && localStorage.getItem("pokemon")!== null){
      setModalShow(true);
    } else {
      alert("Please complete both steps to be able to submit");
    }
  }

  return (
    <div className="pokemonContainer">
      {modalShow && (<ConfirmModal show={modalShow} onSuccess={()=>{setIsSubmitted(true); setModalShow(false); setShow(true);}} onHide={() => setModalShow(false)} />)}
      {show && isSubmitted && (<Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Your Data Saved Successfully</Alert.Heading>
      </Alert>)}
      <Header title="Select Your Favourite Pokemon" />
      <PokemonTypes changeClassFetchPokemons = {changeClassFetchPokemons} setCurrentType = {setCurrentType} />
      <input type="text" className="searchInput" placeholder='Enter Pokemon Name Here...' onChange={(e) => setSearchInput(e.target.value)} />
      <div className="pokemons">
        {pokemons && pokemons.filter((pokemon) => {
            if(searchInput === ""){
              return pokemon;
            } else {
              return pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
            }
          }).map((pokemon, index) => {  
            return (<Form.Check 
              className='radioGroup'
              key={pokemon.name}
              label={pokemon.name}
              defaultChecked={localStorage.getItem("pokemon") === `inline-radio-${pokemon.name}`}
              name="group1"
              type="radio"
              id={`inline-radio-${pokemon.name}`}
              onClick={(e)=>{ localStorage.setItem('pokemon', e.target.id); setCurrentPokemon(e.target.id) }}
            />)
        })}
      </div>
      <div className='controlButtons'>
        <input type="button" className="btn btn-primary" value="Submit" onClick={checkForSubmittion} />
      </div>
    </div>
  )
}

export default Pokemon