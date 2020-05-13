import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const UpdateMovie = ({ movies, history, updateMovies }) => {
	const [updatedMovie, setUpdatedMovie] = useState({
		title: '',
		director: '',
		metascore: '',
		stars: []
	});
	
	const params = useParams();

	const populateMovie = (id) => {
		const movieToEdit = movies.find(movie => `${movie.id}` === id);

		if (movieToEdit) {
			setUpdatedMovie(movieToEdit)
		}
	}

	const handleChange = e => {
		setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
	}

	const handleStars = (e, index) => {
		const newStars = updatedMovie.stars.map((star, i) => i === index ? e.target.value : star);
		setUpdatedMovie({ ...updatedMovie, stars: newStars });
	}

	const handleSubmit = e => {
		e.preventDefault();
		axios.put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
			.then(res => {
				updateMovies(res.data);
				setUpdatedMovie({
					title: '',
					director: '',
					metascore: '',
					stars: []
				});
				history.push(`/movies/${params.id}`)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		populateMovie(params.id);
	}, [params.id]);


	return (
		<Container className='form-container'>
			<h2 style={{ color: '#B0C4DE' }}>Update Movie</h2>
			<Form onSubmit={handleSubmit} className='form'>
				<FormGroup className='form-group'>
					<Label id='inputTitle' className='form-label'>Title:</Label>
					<Input
						type='text'
						name='title'
						id='inputTitle'
						value={updatedMovie.title}
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
						value={updatedMovie.director}
						onChange={handleChange}
						className='form-input'
					/>
				</FormGroup>
				<FormGroup className='form-group'>
					<Label id='inputMetascore' className='form-label'>Metascore:</Label>
					<Input
						type='number'
						name='metascore'
						id='inputMetascore'
						value={updatedMovie.metascore}
						onChange={handleChange}
						className='form-input'
					/>
				</FormGroup>
				<FormGroup className='form-group'>
					<Label id='inputStars' className='form-label'>Stars:</Label>
					<div className='stars'>
						{updatedMovie.stars.map((star, index) => {
							return (
								<Input
									type='text'
									name='stars'
									value={star}
									onChange={(e) => handleStars(e, index)}
									className='form-input'
									id='star'
								/>
							)
						})}
					</div>
				</FormGroup>
				<FormGroup style={{ marginTop: '15px' }}>
					<Button style={{ color: '#B0C4DE', background: '#FFFFFF' }} className='form-button'>Submit</Button>
				</FormGroup>
			</Form>
		</Container>
	)

}

export default UpdateMovie;