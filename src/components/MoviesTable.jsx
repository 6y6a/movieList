import React, {Component} from 'react';
import Like from "./Like";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like'},
        {key: 'delete'},
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
                        movies={movies}
                        onMovieDelete={onMovieDelete}
                        onMovieLike={onMovieLike}
                    />

                </table>
            </div>
        );
    }
}

export default MoviesTable;
