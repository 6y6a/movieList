import React, {Component} from 'react';
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Like from "./Like";

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title'},
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

                <table className='table'>

                    <TableHeader
                        columns={this.columns}
                        sortColumn={sortColumn}
                        onSort={onSort}
                    />

                    <TableBody
                        data={movies}
                        columns={this.columns}
                        onMovieDelete={onMovieDelete}
                        onMovieLike={onMovieLike}
                    />

                </table>
            </div>
        );
    }
}

export default MoviesTable;
