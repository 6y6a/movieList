import React, {Component} from 'react';
import Like from "./Like";

class TableBody extends Component {
    render() {
        const { movies, onMovieLike, onMovieDelete } = this.props

        return (
            <tbody>
            {movies.map(movie => (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => onMovieLike(movie)}/></td>
                    <td><button className='btn btn-danger' onClick={() => onMovieDelete(movie)}>Delete</button></td>
                </tr>

            ))}
            </tbody>
        );
    }
}

export default TableBody;
