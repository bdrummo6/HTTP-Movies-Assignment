import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container, Button } from 'reactstrap';

function SavedList({ list }) {
   return (
      <Container className='saved-list'>
         <h3 className='h3-save'>Saved Movies:</h3>
         {list.map(movie => {
            return (
               <NavLink
                  to={`/movies/${movie.id}`}
                  key={movie.id}
                  activeClassName='saved-active'
               >
                  <span className='saved-movie'>{movie.title}</span>
               </NavLink>
            );
         })}
         <Container className='home-add-container'>
            <Button className='form-button' style={{ border: '1px solid #B0C4DE', background: '#B0C4DE' }}>
               <Link style={{ textDecoration: 'none',  color: '#FFFFFF' }} to='/'>Home</Link>
            </Button>
            <Button className="form-button" style={{ border: '1px solid #B0C4DE', background: '#B0C4DE', marginLeft: '15px'}}>
               <Link style={{ textDecoration: 'none',  color: '#FFFFFF' }} to="/add-movie">Add Movie</Link>
            </Button>
         </Container>
      </Container>
   );
}

export default SavedList;
