import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../config.js";
import { capitalize, formatId } from "../utils.js";

export default function DetailPage() {
  const { name } = useParams(); // /pokemon/pikachu -> "pikachu"
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true; // S23 §7: cegah race condition antar fetch

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/pokemon/${name}`);
        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }
        const data = await response.json();
        if (isCurrent) setPokemon(data);
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }
    loadPokemon();

    return () => {
      isCurrent = false; // fetch lama sekarang dianggap basi
    };
  }, [name]);

  return (
    <section className="detail">
      <Link className="back" to="/">← Back to list</Link>

      {isLoading && <p className="msg">Loading {name}…</p>}
      {!isLoading && error && <p className="msg">{error}</p>}

      {!isLoading && !error && pokemon && (
        <div className="detail-card">
          <div className="d-head">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <div>
              <span className="num">{formatId(pokemon.id)}</span>
              <h2>{capitalize(pokemon.name)}</h2>
              <div className="types">
                {pokemon.types.map((t) => (
                  <span key={t.type.name}>{capitalize(t.type.name)}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="facts">
            Height {pokemon.height / 10} m · Weight {pokemon.weight / 10} kg
          </p>
          {pokemon.stats.map((s) => (
            <div className="stat" key={s.stat.name}>
              <span>{s.stat.name}</span>
              <b>{s.base_stat}</b>
              <i style={{ width: `${Math.min(100, s.base_stat / 1.8)}%` }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
