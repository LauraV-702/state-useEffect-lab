import "./App.css";
import { useState, useEffect } from "react";

function App() {
  //Hold the list of Pokemon from the API
  const [pokemons, setPokemons] = useState([]);
  // Offset, starts at 0, then increase by 20
  const [offset, setOffset] = useState(0);
  //details of the selected Pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  //fetch the set of Pokemon when offset changes
  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  //Fetch 20 Pokemon from the API based on the current offset
  const fetchPokemons = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    const data = await res.json();
    setPokemons(data.results);
  };

  //NEXT
  const handleNext = () => {
    setOffset(offset + 20);
    setSelectedPokemon(null);
  };
  //PREV
  const handlePrev = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
      setSelectedPokemon(null);
    }
  };

  //when clicked, the pokemon details will display
  const handlePokemonClick = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      {/* Display the grid of pokemon names */}
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

        {/* pages changes buttons */}
      <div className="buttons">
        <button onClick={handlePrev} disabled={offset === 0}>
          Prev
        </button>
        <button onClick={handleNext}>Next</button>
      </div>

        {/* display the pokemon details */}
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
