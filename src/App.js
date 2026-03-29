import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Home/Header";
import SinglePage from "./Components/SinglePage";
import SearchMovie from "./Components/SearchMovie";
import { useEffect, useState } from "react";
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://movie-api-eight-jade.vercel.app/movies`)
      .then((res) => res.json())
      .then((json) => {
        const movies = Object.values(json[0]).map((movie) => {
          const convertedMovie = {
            movie_id: movie.movie_id,
            movie_genre: movie.movie_genre,
            movie_duration: movie.movie_duration,
            movie_release: movie.movie_release,
            movie_backimg: movie.movie_backimg,
            movie_director: movie.movie_director,
            movie_trailer: movie.movie_trailer,
            movie_desc: movie.movie_desc,
            movie_cast: movie.movie_cast,
            movie_name: movie.movie_name,
            movie_img: movie.movie_img,
          };
          return convertedMovie;
        });
        setMovies(movies);
      });
  }, []);

  if (movies.length === 0) {
    return <div class="center">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home movies={movies} />}
          />
          <Route exact path="/search" element={<SearchMovie movies={movies} />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/movie/:movie_id" element={<SinglePage allmovies={movies} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
