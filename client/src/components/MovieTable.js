import React, {Component} from "react"
import MovieTableRow from "./MovieTableRow"


export default class MovieTable extends Component
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>RunTime</th>
                        <th>Genre</th>
                        <th>Actors</th>
                        <th>Directors</th>
                        <th>Plot</th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.movies.map((movie) => <MovieTableRow key={movie._id} movie={movie}/>)}
                </tbody>
            </table>      
        )
    }
}