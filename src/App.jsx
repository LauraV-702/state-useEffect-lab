import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const fetchPokemons = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    const data = await res.json();
    setPokemons(data.results);
  };

  const handleNext = () => {
    setOffset(offset + 20);
    setSelectedPokemon(null);
  };

  const handleBack = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
      setSelectedPokemon(null);
    }
  };

  const handlePokemonClick = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>

      <div className="card-container">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="card"
            onClick={() => handlePokemonClick(pokemon.name)}
          >
            {pokemon.name}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleBack} disabled={offset === 0}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </div>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>
            Type:{" "}
            {selectedPokemon.types
              .map((typeObj) => typeObj.type.name)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
