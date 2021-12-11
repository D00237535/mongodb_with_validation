import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"

export default class EditMovie extends Component
{
    constructor(props) 
    {
        super(props)

        this.state = {
            title: ``,
            year: ``,
            runtime: ``,
            genre: ``,
            actors: ``,
            directors: ``,
            plot: ``,
            redirectToDisplayAllMovies:false
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/movies/${this.props.match.params.id}`)
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
                    this.setState({
                        title: res.data.title,
                        year: res.data.year,
                        runtime: res.data.runtime,
                        genre: res.data.genre,
                        actors: res.data.actors,
                        directors: res.data.directors,
                        plot: res.data.plot
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });


            const movieObject = {
                title: this.state.title,
                year: this.state.year,
                runtime: this.state.runtime,
                genre: this.state.genre,
                actors: this.state.actors,
                directors: this.state.directors,
                plot: this.state.plot,
                wasSubmittedAtLeastOnce: false
            }

            axios.post(`${SERVER_HOST}/movies`, movieObject)
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
                        console.log("Record added")
                        this.setState({redirectToDisplayAllMovies:true})
                    }
                }
                else
                {
                    console.log("Record not added")
                }
            })

    }

    validateyear()
    {
        const year = parseInt(this.state.year)
        const today = new Date()
        console.log(year >= 1990 && year <= today.getFullYear())
        return (year >= 1990 && year <= today.getFullYear())
    }

    validateruntime()
    {
        const runtime = parseInt(this.state.runtime)
        console.log(runtime > 0)
        return (runtime > 0)
    }


    validate()
    {
        return {
            year: this.validateyear(),
            runtime: this.validateruntime(),
        };
    }


    render() 
    {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Movie Details are incorrect<br/></div>;
        }  
        return (
            <div className="form-container">
    
                {this.state.redirectToDisplayAllMovies ? <Redirect to="/DisplayAllMovies"/> : null}
                        
                <Form>
                
                    {errorMessage}
                
                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="model" value={this.state.model} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllMovies"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}