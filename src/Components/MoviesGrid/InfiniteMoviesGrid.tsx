import React, { useEffect, useRef } from "react";
import { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";
import "./InfiniteMoviesGrid.css";
import GridLayout from "../GridLayout/GridLayout";

const InfiniteMoviesGrid: React.FC<{
  movies: Movie[];
  isLoading: boolean;
  keyword: string;
  fetchMoreMovies: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  Save:(movie: Movie)=> void;
  WatchLater:(movie: Movie)=> void;
  FilterMoviesByGenre(movies: Movie[]): Movie[]
}> = ({ movies, isLoading, keyword, fetchMoreMovies, setIsLoading,Save,WatchLater,FilterMoviesByGenre }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observerRef.current.observe(
        document.getElementById("infinite-scroll-trigger")!
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchMoreMovies();
    }
    console.log("isLoading", isLoading);
  }, [isLoading]);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    console.group(target.isIntersecting,"target.isIntersecting")
    if (target.isIntersecting) {
      setIsLoading(true);
    }
  };
  const filteredMovies = keyword
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : movies;
  return (
    <div className="infinite-movies-grid">
      <GridLayout movies={FilterMoviesByGenre(filteredMovies)} Save={Save} WatchLater={WatchLater} />
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <div id="infinite-scroll-trigger" />
    </div>
  );
};

export default InfiniteMoviesGrid;
