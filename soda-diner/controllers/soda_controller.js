const Sodas = require('../models/sodaModel.js')

module.exports = {
    // retrieve all sodas
    findAll(req, res) {
        Sodas.find()
            .then(soda => {
                console.log(`Sodas Available: ${soda}`)
                res.json(soda)
            })
            .catch(err => console.log(err))
    }, // end find all sodas
    // create a new soda
    create(req, res) {
        const sodaProps = req.body;
        Sodas.create(sodaProps)
            .then(soda => res.send(soda))
            .catch(err => {
                res.status(500).send(err) // send error to api
            })
    }, // end create soda
    // delete a soda
    delete(req, res) {
        const sodaId = req.params.id;
        console.log('delete this soda: ID #' + sodaId)
        Sodas.deleteOne({ _id: sodaId })
            .then(soda => res.send(soda))
            .catch(err => {
                console.log(err)
            })
    } // end delete a soda
} // end module exports