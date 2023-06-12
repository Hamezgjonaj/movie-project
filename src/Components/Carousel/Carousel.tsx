import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";

const Carousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "http://localhost:4000/movies"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const sortedMovies = [...movies].sort((a, b) => {
    const runtimeA = parseInt(a.runtime);
    const runtimeB = parseInt(b.runtime);
    return runtimeA - runtimeB;
  });

  const visibleMovies = sortedMovies.slice(0, 10);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {visibleMovies.map((movie, index) => (
          <div>
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.runtime} minutes</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
