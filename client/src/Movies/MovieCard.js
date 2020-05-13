import React from 'react';

import { Container } from 'reactstrap';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
     <Container className='movie-card'>
        <h2 className='movie-title'>{title}</h2>
        <div className='movie-director'>
           Director: <em>{director}</em>
        </div>
        <div className='movie-metascore'>
           Metascore: <strong>{metascore}</strong>
        </div>
        <h4>Actors</h4>

        {stars.map(star => (
           <div key={star} className='movie-star'>
              {star}
           </div>
        ))}
     </Container>
  );
};

export default MovieCard;
