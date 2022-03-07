const { response } = require("express");
const validUrl = require('valid-url');
const shortId = require('shortid'); 

const Url = require('../models/url');

const urlBase = 'http://localhost:8080'

const recibirUrl = async (req, res = response) => {

    const { urlLargo } = req.body;

    if(!validUrl.isUri(urlBase)){
        return res.status(401).json({
            msg: 'URL no válido'
        })
    }

    const urlCode = shortId.generate();


    if(validUrl.isUri(urlLargo)){
        try {
            let url = await Url.findOne({urlLargo})

            if(url){
                return res.json(url);
            }else{
               
                const urlCorto = urlBase + '/url/' + urlCode

                url = new Url({
                    urlLargo,
                    urlCorto,
                    urlCode,
                    date: new Date()
                })

                await url.save();
                res.json(url)
            }
        
        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Server Error'})
        }
    }
        else {
            res.status(401).json({
                msg: 'Url largo no válido'
            })
        }

    }


const redireccionar = async (req, res = response) => {

    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            return res.redirect(url.urlLargo)
        } else {
            return res.status(404).json({
                msg: 'URL no encontrada'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
        
    }


}


module.exports = {
    recibirUrl,
    redireccionar
}