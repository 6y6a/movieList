import React, {Component} from 'react';
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./Pagination";
import Filter from './Filter'
import paginate from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import _ from 'lodash'
import { NavLink } from "react-router-dom";
import Input from "./Input";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: null,
        searchRequest: '',
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc'}
    }

    async componentDidMount() {
        const {data: genresInDb} = await getGenres();
        const genres = [{ _id: '', name: 'All genres'}, ...genresInDb]
        const {data: moviesInDb} = await getMovies();

        this.setState({
            movies: moviesInDb,
            genres: genres
        })
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies

        const movies = originalMovies.filter(item => item._id !== movie._id)
        this.setState({movies: movies})

        try {
            await deleteMovie(movie._id);
        } catch (error) {
            this.setState({movies: originalMovies})
        }
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
        this.setState({ selectedGenre: genre, searchRequest: '', currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn})
    }

    handleSearch = ({currentTarget: input}) => {
        this.setState({selectedGenre: null, searchRequest: input.value, currentPage: 1})
    }

    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchRequest, movies: allMovies } = this.state

        let filteredMovies = allMovies

        if (searchRequest) {
            filteredMovies = allMovies.filter(m => m.title.toLowerCase().includes(searchRequest))
        } else if ( selectedGenre && selectedGenre._id) {
            filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id)
        }

        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filteredMovies.length, data: movies }
    }

    render() {
        const { pageSize, currentPage, sortColumn } = this.state

        const {totalCount, data} = this.getPagedData()

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

                        <NavLink to='/movies/new' className="btn btn-primary mb-4">Create new</NavLink>

                        <p style={{margin: 0}}>Showing {totalCount} in the database</p>

                        <Input
                            name='search'
                            value={this.state.searchRequest}
                            placeholder='Search...'
                            onChange={this.handleSearch}
                        />

                        <MoviesTable
                            movies={data}
                            sortColumn={sortColumn}
                            onMovieDelete={this.handleDelete}
                            onMovieLike={this.handleLike}
                            onSort={this.handleSort}
                        />

                        <Pagination
                            itemsCount={totalCount}
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
