import React, { useEffect, useState } from "react";

import "./App.css";
import SearchIcon from "./Search.svg";
import MovieCard from "./Components/MovieCard";

const API_KEY = "http://www.omdbapi.com/?apikey=6f70556a&";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const getApi = async (title) => {
    try {
      const response = await fetch(`${API_KEY}s=${title}`);
      if (!response.ok) {
        throw new Error("Cant Get Data");
      }
      const result = await response.json();
      const data = result.Search;
      setMovies(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="app">
      <h1>Movie Database</h1>
      <div className="search">
        <input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="searchIcon"
          onClick={() => {
            getApi(search);
            setSearch("");
          }}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Such Movie</h2>
        </div>
      )}
    </div>
  );
}

export default App;
