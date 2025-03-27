import React, { useEffect, useState } from "react";
import api from "../utils/api";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get("/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((song) => (
          <li key={song.id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;