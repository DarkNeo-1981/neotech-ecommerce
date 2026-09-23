
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext.js";

export function useFavorites() {
  return useContext(FavoritesContext);
}