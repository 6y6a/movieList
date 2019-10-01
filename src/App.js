import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { Switch, Route, Redirect } from 'react-router-dom';
import PageMovies from "./pages/PageMovies";
import PageCustomers from "./pages/PageCustomers";
import PageRentals from "./pages/PageRentals";
import PageNotFound from "./pages/PageNotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import MovieForm from "./components/MovieForm";

function App() {
    return (
        <main>
            <Navbar/>

            <div className="container mt-4">
                <Switch>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/register' component={RegisterForm}/>
                    <Route path='/movies/new' component={MovieForm}/>
                    <Route path='/movies/:id' component={MovieForm}/>
                    <Route path='/movies' component={PageMovies}/>
                    <Route path='/customers' component={PageCustomers}/>
                    <Route path='/rentals' component={PageRentals}/>
                    <Route path='/not-found' component={PageNotFound}/>
                    <Redirect exact from='/' to='/movies'/>
                    <Redirect to='/not-found'/>
                </Switch>
            </div>

        </main>
    );
}

export default App;
