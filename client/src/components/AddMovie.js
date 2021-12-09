import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class AddMovie extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            title:"",
            year:"",
            runtime:"",
            genre:"",
            actors:"",
            directors:"",
            plot:"",
            redirectToDisplayAllMovies:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();
        
        if (Object.keys(formInputsState).every(index => formInputsState[index])) 
        {
            const movieObject = {
                model: this.state.title,
                colour: this.state.year,
                year: this.state.runtime,
                price: this.state.,
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
    }


    validateModel()
    {    
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.model))
    }
    
    
    validateColour()
    {    
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.colour))
    }
    
    
    validateYear()
    {    
        const year = parseInt(this.state.year)
        const today = new Date()   
        return (year >= 1990 && year <= today.getFullYear())
    }


    validatePrice()
    {    
        const price = parseInt(this.state.price)
        return (price >= 1000 && price <= 100000)
    }


    validate() 
    {
        return {
            model: this.validateModel(),
            colour: this.validateColour(),
            year: this.validateYear(),
            price: this.validatePrice()
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
                                    <Form.Group controlId="Title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="Title" value={this.state.Title} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Year">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control type="text" name="Year" value={this.state.Year} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="RunTime">
                                        <Form.Label>RunTime</Form.Label>
                                        <Form.Control type="text" name="RunTime" value={this.state.RunTime} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Genre">
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Control type="text" name="Genre" value={this.state.Genre} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Actors">
                                        <Form.Label>Actors</Form.Label>
                                        <Form.Control type="text" name="Actors" value={this.state.Actors} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Directors">
                                        <Form.Label>Directors</Form.Label>
                                        <Form.Control type="text" name="Directors" value={this.state.Directors} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="Plot">
                                        <Form.Label>Plot</Form.Label>
                                        <Form.Control type="text" name="Plot" value={this.state.Plot} onChange={this.handleChange} />
                                    </Form.Group>

                                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                                </Form>
            </div>
        )
    }
}