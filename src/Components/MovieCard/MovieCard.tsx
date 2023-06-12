import React from "react";
import { Movie } from "../../types"; // Assuming you have a separate types file
import "./MovieCard.css"; // Assuming you have a separate CSS file for the MovieCard component

interface MovieCardProps {
  movie: Movie;
  onSave?: (movie: Movie) => void;
  onWatchLater?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSave,
  onWatchLater,
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave(movie);
    }
  };

  const handleWatchLater = () => {
    if (onWatchLater) {
      onWatchLater(movie);
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.runtime} minutes</p>
      <div className="action-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleWatchLater}>Watch Later</button>
      </div>
    </div>
  );
};

export default MovieCard;
