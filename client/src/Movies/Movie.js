import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import MovieCard from './MovieCard';

import { Container, Button } from 'reactstrap';

function Movie({ addToSavedList, history, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
       .get(`http://localhost:5000/api/movies/${id}`)
       .then((res) => setMovie(res.data))
       .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };


  const removeMovie = () => {
    deleteMovie(movie.id);
    history.push('/');
  }


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
     <Container className='save-wrapper'>

       <MovieCard movie={movie} />

       <Container className='buttons'>
          <Button style={{ background: 'green', color: '#FFFFFF'}} className='form-button' onClick={saveMovie}>
            Save
          </Button>
          
          <Button style={{ background: '#B0C4DE', color: '#FFFFFF'}} className='form-button' onClick={() => history.push(`/update-movie/${movie.id}`)}>
            Update
          </Button>
          <Button style={{ background: 'red', color: '#FFFFFF'}} className='form-button' onClick={removeMovie}>
            Delete
          </Button>
       </Container>

     </Container>
  );
}

export default Movie;