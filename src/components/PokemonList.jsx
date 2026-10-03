import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE, LIST_LIMIT, SPRITE_BASE } from "../config.js";
import { capitalize, getIdFromUrl, formatId } from "../utils.js";

// S21: fetch di dalam useEffect + tiga state (loading / error / success).
export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemons() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/pokemon?limit=${LIST_LIMIT}`);
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        setPokemons(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadPokemons();
  }, []);

  if (isLoading) return <p className="msg">Loading Pokémon…</p>;
  if (error) return <p className="msg">Couldn't load the list: {error}</p>;

  return (
    <ul className="grid">
      {pokemons.map((pokemon) => {
        const id = getIdFromUrl(pokemon.url);
        return (
          <li key={pokemon.name}>
            <Link className="card" to={`/pokemon/${pokemon.name}`}>
              <span className="thumb">
                <img loading="lazy" src={`${SPRITE_BASE}${id}.png`} alt="" />
              </span>
              <span className="num">{formatId(id)}</span>
              <span className="name">{capitalize(pokemon.name)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
