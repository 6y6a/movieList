import React, {Component} from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./Pagination";
import Filter from './Filter'
import paginate from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import _ from 'lodash'

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: null,
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All genres'}, ...getGenres()]

        this.setState({
            movies: getMovies(),
            genres: genres
        })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(item => movie._id !== item._id)
        this.setState({movies: movies})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked
        this.setState({movies})
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleFilterChange = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn})
    }

    render() {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state

        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies

        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

        return (
            <div>
                <div className="row">
                    <div className="col-2">
                        <Filter
                            genres={this.state.genres}
                            selectedGenre={this.state.selectedGenre}
                            onFilterChange={this.handleFilterChange}
                        />
                    </div>

                    <div className="col">
                        <p>Showing {filteredMovies.length} in the database</p>

                        <MoviesTable
                            movies={movies}
                            sortColumn={this.state.sortColumn}
                            onMovieDelete={this.handleDelete}
                            onMovieLike={this.handleLike}
                            onSort={this.handleSort}
                        />

                        <Pagination
                            itemsCount={filteredMovies.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>


            </div>
        );
    }
}

export default Movies;
