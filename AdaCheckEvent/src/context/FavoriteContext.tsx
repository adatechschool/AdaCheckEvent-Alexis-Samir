import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Event } from "../constants/Event";

type FavoriteContextType = {
  favorites: string[];
  addFavorite: (event: Event) => void;
  removeFavorite: (event: Event) => void;
  toggleFavorite: (event: Event) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

type FavoriteProviderProps = {
  children: ReactNode;
};

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Favorites saved to localStorage:", favorites);
  }, [favorites]);

  const addFavorite = (event: Event) => {
    setFavorites((prev) => {
      if (prev.includes(event.id)) {
        return prev; // Already exists, don't add
      }
      const newFavorites = [...prev, event.id];
      console.log("Added to favorites:", event.id, "New list:", newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (event: Event) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== event.id);
      console.log("Removed from favorites:", event.id, "New list:", newFavorites);
      return newFavorites;
    });
  };

  const toggleFavorite = (event: Event) => {
    if (favorites.includes(event.id)) {
      removeFavorite(event);
    } else {
      addFavorite(event);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
