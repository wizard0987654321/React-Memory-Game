import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './styles.css';

export default function MemoryGame() {

    const [pokemons, setPokemons] = useState(null)
    const [counter, setCounter] = useState(0)
    const [chosenPokemons, setChosenPokemons] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [endMessage, setEndMessage] = useState("You won the Game!");
    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    useEffect(() => {
        const fetchData = async () => {
            try {
              let res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=12");
              let data = await res.json();
              const pokemonsWithImages = data.results.map((pokemon, index) => ({
                name: pokemon.name,
                imgUrl: `${baseUrl}${index + 1}.png`
            }));
            setPokemons(pokemonsWithImages);

            } catch (error) {
              console.error('Error fetching Pokémon data:', error);
            }
          }
          fetchData();
  }, []);

function updateScore(e) {
    console.log(e.currentTarget);
    const chosenPokemonName = e.currentTarget.querySelector('h3').textContent;
    if (!chosenPokemons.includes(chosenPokemonName)) {
        updateGame(chosenPokemonName);
    } else {
        setEndMessage("You lost the Game");
        setIsFinished(true);
    }
    console.log(pokemons);
}

function updateGame(chosenPokemonName) {
    if(chosenPokemons.length == 11) {
        setIsFinished(true);
    }
    setCounter(prevScore => prevScore + 1);
    setChosenPokemons([...chosenPokemons, chosenPokemonName]);
    shuffleCards();
}

function shuffleCards() {
    setPokemons(prevPokemons => {
        const shuffled = [...prevPokemons].sort(() => Math.random() - 0.5);
        return shuffled;
    });
}

  return (
    <div>
      <h1>Memory Game</h1>
      <p>{counter}</p>
      <h3>{isFinished && endMessage}</h3>
      <div className="card-container">
      {pokemons && !isFinished &&
        pokemons.map((pokemon, index) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} imgUrl={pokemon.imgUrl} onClick={updateScore}/>
          ))
    }

        </div>
    </div>
  );
}

