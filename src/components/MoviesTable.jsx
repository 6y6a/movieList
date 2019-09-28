import React, {Component} from 'react';
import Like from "./Like";
import Table from "./Table";
import {NavLink} from "react-router-dom";

class MoviesTable extends Component {
    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => <NavLink to={`/movies/${movie._id}/`}>{movie.title}</NavLink>
        },
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            key: 'like',
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onMovieLike(movie)}/>
        },
        {
            key: 'delete',
            content: movie => <button className='btn btn-danger' onClick={() => this.props.onMovieDelete(movie)}>Delete</button>
        },
    ]

    render() {
        const { movies, sortColumn, onSort, onMovieDelete, onMovieLike } = this.props

        return (
            <div>

                <Table
                    data={movies}
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                    onMovieDelete={onMovieDelete}
                    onMovieLike={onMovieLike}
                />

            </div>
        );
    }
}

export default MoviesTable;
