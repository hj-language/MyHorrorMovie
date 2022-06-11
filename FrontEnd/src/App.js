import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from './Header.js';

import MovieList from './MovieList.js';
import InputMovie from './InputMovie.js';

import ReviewList from './ReviewList.js';
import InputReview from './InputReview.js';
import UpdateReview from './UpdateReview.js';
import ReviewView from './ReviewView.js';

import AllMovieList from "./AllMovieList.js";

import Main from './Main.js';

import Footer from './Footer.js';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<MovieList />} />
        <Route path="movies/input" element={<InputMovie />} />
        <Route path="reviews" element={<ReviewList />} />
        <Route path="reviews/:reviewId" element={<ReviewView />} />
        <Route path="reviews/input/:movieId" element={<InputReview />} />
        <Route path="reviews/update/:reviewId" element={<UpdateReview />} />
        <Route path="allMovies" element={<AllMovieList/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
