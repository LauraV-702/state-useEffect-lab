import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0); 

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

  const handlePrev = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
    }
  };

  const handleNext = () => {
    setOffset(offset + 20);
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div className="card-container">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="card">
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handlePrev} disabled={offset === 0}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
