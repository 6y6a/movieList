import React, {Component} from 'react';

class PageMovie extends Component {
    render() {
        const {match} = this.props

        return (
            <div>
                <h1>Movie Form {match.params.id}</h1>
                <button className="btn btn-primary">Save</button>
            </div>
        );
    }
}

export default PageMovie;
