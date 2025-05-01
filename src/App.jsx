import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();
    console.log("Fetched Pokémon list:", data);
    setPokemons(data.results);
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
    </div>
  );
}

export default App;
