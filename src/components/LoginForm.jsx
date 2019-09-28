import React, {Component} from 'react';

class LoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();

        console.log('submited')
    }

    render() {
        return (
            <div>
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="email" className="form-control" id="username" placeholder="Enter a name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter a password" />
                    </div>
                    <button type='submit' className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
