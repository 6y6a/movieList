import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
    const { genres, selectedGenre, onFilterChange } = props

    return (
        <ul className="list-group">
            {genres.map(genre => (
                <li className={selectedGenre === genre ? 'list-group-item active' : "list-group-item"}
                    key={genre._id}
                    onClick={() => onFilterChange(genre)}
                >
                    {genre.name}
                </li>
            ))}
        </ul>
    )
}

Filter.propTypes = {
    genres: PropTypes.array
};

export default Filter;
