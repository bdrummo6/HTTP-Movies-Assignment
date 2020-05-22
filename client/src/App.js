import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';

const App = () => {
   const [savedList, setSavedList] = useState([]);
   const [movieList, setMovieList] = useState([]);

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/movies')
         .then(res => setMovieList(res.data))
         .catch(err => console.log(err.response));
   }, [])

   const addToSavedList = movie => {
      setSavedList([...savedList, movie]);
   };

   const updateMovies = (updatedMovie) => { // Function to update movieList with the newly updated movie in plavc
      const newMovies = movieList.map(movie => {
         if (movie.id === updatedMovie.id) {
            return updatedMovie;
         } else {
            return movie;
         }
      })
      setMovieList(newMovies);
   }

   const deleteMovie = id => {
      axios.delete(`http://localhost:5000/api/movies/${id}`)
         .then(res => {
            setMovieList(movieList.filter(movie => movie.id !== res.data));
         })
         .catch(err => console.log(err))
   }


   return (
      <>
         <SavedList list={savedList} />

         <Route exact path='/' render={props => <MovieList {...props} movies={movieList} />} />

         <Route path='/movies/:id' render={props => <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />} />

         <Route path='/update-movie/:id' render={props => <UpdateMovie {...props} movies={movieList} updateMovies={updateMovies} />} />

         <Route path="/add-movie" render={props => <AddMovie {...props} setMovies={setMovieList} updateMovies={updateMovies} />} />

      </>
   );
};

export default App;