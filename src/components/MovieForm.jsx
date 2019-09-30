import React, {Component} from 'react';
import Form from './Form'
import Joi from "joi-browser";
import {getMovie, getMovies, saveMovie} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        genres: [],
        errors: {}
    }

    schema = {
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number in stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    }

    componentDidMount() {
        const genres = getGenres()
        this.setState({genres})

        const movieId = this.props.match.params.id;
        if ( movieId === 'new') return

        const movie = getMovie(movieId)
        if (!movie) return this.props.history.replace('not-found')

        this.setState({data: this.mapToViewModel(movie)})
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        }
    }

    doSubmit = () => {
        // Call the server
        saveMovie(this.state.data)
        this.props.history.push('/movies')
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>

                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}

                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
