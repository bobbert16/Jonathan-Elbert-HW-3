import { useState } from "react";
import { useNavigate } from "react-router-dom";

// S22: controlled input + preventDefault + validasi. S23: navigate() ke halaman detail.
export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = query.trim().toLowerCase();

    if (name === "") {
      setError("Type a Pokémon name first.");
      return;
    }
    setError(null);
    navigate(`/pokemon/${name}`);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="field">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a Pokémon by name…"
          aria-label="Pokémon name"
        />
      </div>
      <button type="submit">Search</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
