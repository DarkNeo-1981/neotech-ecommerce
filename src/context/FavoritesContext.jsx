
import { useEffect, useState } from "react";
import FavoritesContext from "./FavoritesContext.js";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prevFavorites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prevFavorites, product];
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (item) => item.id === productId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}