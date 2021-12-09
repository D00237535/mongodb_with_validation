import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/main.css"

import AddMovie from "./components/AddMovie"
import EditMovie from "./components/EditMovie"
import DeleteMovie from "./components/DeleteMovie"
import DisplayAllMovies from "./components/DisplayAllMovies"

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={DisplayAllMovies} />
                    <Route exact path="/AddMovie" component={AddMovie} />
                    <Route exact path="/EditMovie/:id" component={EditMovie} />
                    <Route exact path="/DeleteMovie/:id" component={DeleteMovie} />
                    <Route exact path="/DisplayAllMovies" component={DisplayAllMovies}/>
                    <Route path="*" component={DisplayAllMovies}/>
                </Switch>
            </BrowserRouter>
        )
    }
}