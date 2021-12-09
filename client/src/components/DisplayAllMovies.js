import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import MovieTable from "./MovieTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayAllMovies extends Component
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            movies:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/movies`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    this.setState({movies: res.data})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  
    render() 
    {   
        return (           
            <div className="form-container">

                <div className="table-container">
                    <MovieTable movies={this.state.movies} />

                    <div className="add-new-movie">
                        <Link className="blue-button" to={"/AddMovie"}>Add New Movie</Link>
                    </div>
                </div>
            </div> 
        )
    }
}