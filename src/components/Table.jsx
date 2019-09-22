import React from 'react';
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = (props) => {
    const {data, columns, sortColumn, onSort, onMovieDelete, onMovieLike } = props

    return (
        <table className='table'>

            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />

            <TableBody
                data={data}
                columns={columns}
                onMovieDelete={onMovieDelete}
                onMovieLike={onMovieLike}
            />

        </table>
    )
}

export default Table;
