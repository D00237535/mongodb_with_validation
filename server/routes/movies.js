const router = require(`express`).Router()

const moviesModel = require(`../models/movies`)

// read all records
router.get(`/movies`, (req, res) =>
{   
    //user does not have to be logged in to see movie details
    moviesModel.find((error, data) =>
    {
        res.json(data)
    })
})


// Read one record
router.get(`/movies/:id`, (req, res) =>
{
    moviesModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


// Add new record
router.post(`/movies`, (req, res) =>
{
    // validate input

    // input is valid

        moviesModel.create(req.body, (error, data) =>
        {
            res.json(data)
        })

})


// Update one record
router.put(`/movies/:id`, (req, res) =>
{
    // validate input
    const today = new Date();
    if(!/^[a-zA-Z]+$/.test(req.body.model))
    {
        res.json({errorMessage:`Model must be a string`}); 
    }
    else if(!/^[a-zA-Z]+$/.test(req.body.colour))
    {
        res.json({errorMessage:`Colour must be a string`});         
    }
    else if(req.body.year < 1990)     // between 1990 and the current year
    {
        res.json({errorMessage:`Year needs to be greater than or equal to 1990`});         
    }
    else if(req.body.year > today.getFullYear())
    {
        res.json({errorMessage:`Year needs to be this year or less`});         
    }
    else if(req.body.price < 1000 || req.body.price > 100000)       // between €1000 and €100000                
    {
        res.json({errorMessage:`Price needs to be between €1000 and €100000`}); 
    }
    else // input is valid
    {
        moviesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
        {
            res.json(data)
        })        
    }
})


// Delete one record
router.delete(`/movies/:id`, (req, res) =>
{
    moviesModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })       
})

module.exports = router