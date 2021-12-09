const mongoose = require(`mongoose`)

let moviesSchema = new mongoose.Schema(
   {
        model: {type: String},
        colour: {type: String},
        year: {type: Number},
        price: {type: Number}
   },
   {
       collection: `movies`
   })

module.exports = mongoose.model(`movies`, moviesSchema)