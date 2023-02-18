const { Router } = require('express');

const { addCxDetails, getAllCxDetails } = require('./controller');

const apiRouter = Router();

module.exports =
    apiRouter
        .post('/addCxDetails', async (req, res) => {
            console.log(req.body)
            const result = await addCxDetails(req.body)
            const statusCode = (result.status == "fail") ? 400 : 200
            res.status(statusCode).send(result)
        })
        .get('/getAllCxDetails', async (req, res) => {
            const result = await getAllCxDetails()
            const statusCode = (result.status == "fail") ? 400 : 200
            res.send(result)
        })
