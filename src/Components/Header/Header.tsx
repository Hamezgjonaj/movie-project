import React, { useState } from "react";
import "./Header.css";
import { ShowType } from "../../types";

const Header: React.FC<{
  keyword: string;
  genres: string[];
  selectedGenres: string[];
  selectedDecade: string;
  show: ShowType;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setShow: React.Dispatch<React.SetStateAction<ShowType>>;
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  handleDecadeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  keyword,
  genres,
  selectedGenres,
  selectedDecade,
  show,
  setKeyword,
  setShow,
  setSelectedGenres,
  handleDecadeChange
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.value;
    if (event.target.checked) {
      setSelectedGenres((prevGenres) => [...prevGenres, genre]);
    } else {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((selectedGenre) => selectedGenre !== genre)
      );
    }
  };
  return (
    <div className="main">
      <div className="header">
        <h1 className="title" onClick={() => setShow("all")}>
          Movie App
        </h1>
        {show ? (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search movies"
              value={keyword}
              onChange={(e) => setKeyword(e.currentTarget.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="action-buttons">
          <button
            className="saved-button"
            onClick={() => setShowFilters((prevValue) => !prevValue)}
          >
            ShowFilters
          </button>
          <button className="saved-button" onClick={() => setShow("saved")}>
            Saved
          </button>
          <button
            className="watch-later-button"
            onClick={() => setShow("watch later")}
          >
            Watch Later
          </button>
        </div>
      </div>
      {showFilters ? (
        <div>
          <div className="filters">
            {genres.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  value={genre}
                  onChange={handleGenreChange}
                  checked={selectedGenres.includes(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          <div className="filters" >
            <select value={selectedDecade} onChange={handleDecadeChange}>
              <option value="">All Decades</option>
              <option value="1980">80s</option>
              <option value="1990">90s</option>
              <option value="2000">00s</option>
              <option value="2010">10s</option>
              <option value="2020">20s</option>
            </select>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
