import React, { useState } from 'react';
import axios from 'axios';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AddMovie = ({ updateMovies, history }) => {
    const [newMovie, setNewMovie] = useState({
        title: '', 
        director: '', 
        metascore: 0, 
        stars: []
    });

    const handleChange = e => {
        e.preventDefault();
		setNewMovie({...newMovie, [e.target.name]: e.target.value});
    }

    const handleStars = e => {
        const newStars = newMovie.stars.map((star, index) => {
        if (`${index}` === e.target.name) {
            return e.target.value;
        } else {
            return star;
        }   
    })
        console.log(newStars)
        setNewMovie({ ...newMovie, stars: newStars });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, newMovie)
            .then(res => {
                // console.log(res.data)
                updateMovies(res.data)
                setNewMovie({
                    title: '', 
                    director: '', 
                    metascore: 0, 
                    stars: []
                });
                history.push(`/`)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="form-container">
			  	<h2 style={{ color: '#B0C4DE' }}>Add Movie</h2>
					<Form onSubmit={handleSubmit} className='form'>
						<FormGroup className='form-group'>
							<Label id='inputTitle' className='form-label'>Title:</Label>
							<Input
								type='text'
								name='title'
								id='inputTitle'
								value={newMovie.title}
								placeholder="ex. Jaws"
								onChange={handleChange}
								className='form-input'
							/>
						</FormGroup>
						<FormGroup className='form-group'>
							<Label id='inputDirector' className='form-label'>Director:</Label>
							<Input
								type='text'
								name='director'
								id='inputDirector'
								value={newMovie.director}
								onChange={handleChange}
								placeholder="ex. Steven Spielberg"
								className='form-input'
							/>
						</FormGroup>
						<FormGroup className='form-group'>
							<Label id='inputMetascore' className='form-label'>Metascore:</Label>
							<Input
								type='number'
								name='metascore'
								id='inputMetascore'
								value={newMovie.metascore}
								min='1'
								max='100'
								onChange={handleChange}
								className='form-input'
							/>
						</FormGroup>
						<FormGroup className='form-group'>
							<Label className='form-label'>Stars:</Label>
							<div className='stars'>
								<Input
									 type="text"
									 name="0"
									 value={newMovie.stars[0]}
									 onChange={handleStars}
									 placeholder='ex. Sandra Bullock'
									 className='form-input'
									id='star'
								/>
								<Input
									 type="text"
									 name="1"
									 value={newMovie.stars[1]}
									 onChange={handleStars}
									 placeholder='ex. Tom Hanks'
									 className='form-input'
									id='star'
								/>
								<Input
									 type="text"
									 name="2"
									 value={newMovie.stars[2]}
									 onChange={handleStars}
									 placeholder='ex. Matt Damon'
									 className='form-input'
									 id='star'
								/>
							</div>
						</FormGroup>
						<FormGroup style={{ marginTop: '15px' }}>
							<Button style={{ color: '#B0C4DE', background: '#FFFFFF' }} className='form-button'>Submit</Button>
						</FormGroup>
				</Form>
        </Container>
    )
}

export default AddMovie;