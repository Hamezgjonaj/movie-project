import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Genre, Movie, ShowType } from "./types";
import Carousel from "./Components/Carousel/Carousel";
import InfiniteMoviesGrid from "./Components/MoviesGrid/InfiniteMoviesGrid";
import "./App.css";
import Header from "./Components/Header/Header";
import GridLayout from "./Components/GridLayout/GridLayout";
const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedDecade, setSelectedDecade] = useState<string>("");
  const [saved, setSaved] = useState<Movie[]>([]);
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState<ShowType>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Genre[]> = await axios.get(
          "http://localhost:4000/genres"
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function FilterMoviesByGenre(movies: Movie[]): Movie[] {
    if (selectedGenres.length === 0) {
      // No genres selected, return all movies
      return movies;
    }
  
    return movies.filter((movie) =>
      movie.genres.some((genre) => selectedGenres.includes(genre))
    );
  }
  const handleDecadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDecade(event.target.value);
  };
  const filterMoviesByDecade = (decade: string): Movie[] => {
    if (decade === "") {
      return movies;
    }

    const startYear = Number(decade);
    const endYear = startYear + 9;

    return movies.filter(
      (movie) =>
        Number(movie.year) >= startYear && Number(movie.year) <= endYear
    );
  };
  const MainContent = () => {
    switch (show) {
      case "all":
        return (
          <InfiniteMoviesGrid
            movies={filterMoviesByDecade(selectedDecade)}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            fetchMoreMovies={fetchMoreMovies}
            keyword={keyword}
            Save={Save}
            WatchLater={WatchLater}
            FilterMoviesByGenre={FilterMoviesByGenre}
          />
        );

      case "saved":
        return <GridLayout movies={saved} />;

      case "watch later":
        return <GridLayout movies={watchLater} />;

      default:
        return <div></div>;
    }
  };
  function Save(movie: Movie) {
    const array = saved;
    const index = array.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      setSaved([...array.slice(0, index), ...array.slice(index + 1)]);
    } else {
      setSaved([...saved, movie]);
    }
  }
  function WatchLater(movie: Movie) {
    const array = saved;
    const index = array.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      setWatchLater([...array.slice(0, index), ...array.slice(index + 1)]);
    } else {
      setWatchLater([...watchLater, movie]);
    }
  }

  const fetchMoreMovies = async () => {
    try {
      const response: AxiosResponse<Movie[]> = await axios.get(
        `http://localhost:4000/movies?_page=${page + 1}&_limit=20`
      );
      const newMovies = response.data;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching more movies:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="app">
      <Header keyword={keyword} genres={genres} selectedGenres={selectedGenres} selectedDecade={selectedDecade} show={show} setKeyword={setKeyword} setShow={setShow} setSelectedGenres={setSelectedGenres} handleDecadeChange={handleDecadeChange}  />
      {show === "all" ? <Carousel /> : ""}
      {MainContent()}
    </div>
  );
};

export default App;
