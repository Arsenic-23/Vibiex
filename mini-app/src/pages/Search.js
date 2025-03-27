import React, { useState } from "react";
import SearchBar from "../components/Search";
import Queue from "../components/Queue";

function Search() {
  const [source, setSource] = useState("YouTube");

  return (
    <div className="search-page">
      <header>
        <h1>Search Songs</h1>
        <select onChange={(e) => setSource(e.target.value)} value={source}>
          <option value="YouTube">YouTube</option>
          <option value="Spotify">Spotify</option>
        </select>
      </header>
      <SearchBar source={source} />
      <Queue />
    </div>
  );
}

export default Search;