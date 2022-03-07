const {Schema, model} = require("mongoose");


const UrlSchema = Schema({

    urlCode: String,
    urlLargo: String,
    urlCorto: String,
    date: {
        type: String,
        default: Date.now
    }
})


module.exports = model('URL', UrlSchema)