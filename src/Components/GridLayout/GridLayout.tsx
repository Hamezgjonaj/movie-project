import React from "react";
import { Movie } from "../../types"; // Assuming you have a separate types file
import "./GridLayout.css"; // Assuming you have a separate CSS file for the MovieCard component
import MovieCard from "../MovieCard/MovieCard";

interface GridLayoutProps {
  movies: Movie[];
  Save?:(movie: Movie)=> void;
  WatchLater?:(movie: Movie)=> void;
}

const GridLayout: React.FC<GridLayoutProps> = ({ movies ,Save,WatchLater }) => (
  <div className="movies-grid">
    {movies.map((movie) => (
      <MovieCard
        movie={movie}
        onSave={Save}
        onWatchLater={WatchLater}
      />
    ))}
  </div>
);

export default GridLayout;
