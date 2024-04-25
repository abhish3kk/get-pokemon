import { useState } from "react";
import "./App.css";

function App() {
  const [url] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  const getRandomPokemon = async () => {
    setLoading(true);
    let allPokemons = await fetch(url);
    allPokemons = await allPokemons.json();
    let randomPokemon =
      allPokemons.results[getRandomNumber(0, allPokemons.results.length)];
    let pokemonInfo = await fetch(randomPokemon.url);
    pokemonInfo = await pokemonInfo.json();
    setPokemon(pokemonInfo);
    setLoading(false);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getPokemonDetails = (type) => {
    let output = [];
    const shuffled = type.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 4);

    selected.forEach((elt) => {
      if (elt["ability"]) {
        output = [...output, elt["ability"].name];
      }
      if (elt["move"]) {
        output = [...output, elt["move"].name];
      }
      if (elt["type"]) {
        output = [...output, elt["type"].name];
      }
    });

    return output;
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>Loading...</h1>
        ) : pokemon ? (
          <h1 className="pokemon">You caught {pokemon.name}</h1>
        ) : (
          <h1>'Catch em all'</h1>
        )}

        {pokemon ? (
          <>
            <ul style={{textAlign:'left'}}>
              <li>
              Abilities
                <ul>{getPokemonDetails(pokemon.abilities).map((ability) => <li>{ability}</li>)}</ul>
              </li>
              <li>
              Moves
                <ul>{getPokemonDetails(pokemon.moves).map((move) => <li>{move}</li>)}</ul>                
              </li>
              <li>
              Types
                <ul>{getPokemonDetails(pokemon.types).map((type) => <li>{type}</li>)}</ul>
              </li>
            </ul>
          </>
        ) : (
          ""
        )}
        <button onClick={getRandomPokemon} disabled={loading}>
          Get Pokemon
        </button>
      </header>
    </div>
  );
}

export default App;
