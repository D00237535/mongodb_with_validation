import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class MovieTableRow extends Component
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.movie.model}</td>
                <td>{this.props.movie.year}</td>
                <td>{this.props.movie.colour}</td>
                <td>{this.props.movie.price}</td>
                <td>
                    <Link className="green-button" to={"/EditMovie/" + this.props.movie._id}>Edit</Link>
                    <Link className="red-button" to={"/DeleteMovie/" + this.props.movie._id}>Delete</Link>
                </td>
            </tr>
        )
    }
}