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
            model: ``,
            colour: ``,
            year: ``,
            price: ``,
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
                        model: res.data.model,
                        colour: res.data.colour,
                        year: res.data.year,
                        price: res.data.price
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

        const formInputsState = this.validate();
        
        if (Object.keys(formInputsState).every(index => formInputsState[index])) 
        {
            const movieObject = {
                model: this.state.model,
                colour: this.state.colour,
                year: this.state.year,
                price: this.state.price
            }

            axios.put(`${SERVER_HOST}/movies/${this.props.match.params.id}`, movieObject)
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
                        console.log(`Record updated`)
                        this.setState({redirectToDisplayAllMovies:true})
                    }
                }
                else
                {
                    console.log(`Record not updated`)
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