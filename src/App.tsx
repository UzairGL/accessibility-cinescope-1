import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", available: true, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", available: false, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", available: true, poster: posterOrbite },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="topbar">
        <button type="button" className="brand" onClick={() => setQuery("")}>CinéScope</button>
        <nav className="menu">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </nav>
      </header>

      <main id="contenu" className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <label className="search-label" htmlFor="search">Rechercher un film</label>
        <input
          id="search"
          className="search"
          type="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => (
            <div className="film-card" key={film.id}>
              <img src={film.poster} alt={`Affiche du film ${film.title}`} />
              <div className="film-content">
                <div className={film.available ? "availability available" : "availability unavailable"} />
                <h2>
                  <button type="button" className="film-select" onClick={() => setSelected(film.title)}>{film.title}</button>
                </h2>
                <p>{film.genre} · {film.time}</p>
                <p className="status">{film.available ? "Places disponibles" : "Complet"}</p>
                <button
                  type="button"
                  className="favorite"
                  aria-label={`${favorites.includes(film.id) ? "Retirer des favoris" : "Ajouter aux favoris"} : ${film.title}`}
                  onClick={(event) => {
                    toggleFavorite(film.id);
                  }}
                >
                  {favorites.includes(film.id) ? "★" : "☆"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <output className="selection">{selected && `Film sélectionné : ${selected}`}</output>

        <section id="infos">
          <h2>Informations</h2>
          <p className="intro">La programmation est mise à jour chaque semaine.</p>
        </section>
      </main>
    </>
  );
}

