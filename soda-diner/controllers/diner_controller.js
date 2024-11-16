const Diners = require('../models/dinerModel.js')

module.exports = {
    // retrieve all diners
    findAll(req, res) {
        Diners.find()
            .then(diner => {
                console.log(`Diners Available: ${diner}`)
                res.json(diner)
            })
            .catch(err => console.log(err))
    }, // end find all diners
    // create a new diner
    create(req, res) {
        const dinerProps = req.body;
        Diners.create(dinerProps)
            .then(diner => res.send(diner))
            .catch(err => {
                res.status(500).send(err) // send error to api
            })
    }, // end create new diner
    // delete a diner
    delete(req, res) {
        const dinerId = req.params.id;
        console.log('delete this diner: ID #' + dinerId)
        Diners.deleteOne({ _id: dinerId })
            .then(diner => res.send(diner))
            .catch(err => { 
                console.log(err) 
            })
    }, // end delete a diner
    // edit diner's soda list
    edit(req, res, next) {
        const dinerId = req.params.id;
        console.log('edit this diner: ID #' + dinerId)
        const dinerProps = req.body;
        Diners.findByIdAndUpdate({ _id: dinerId }, dinerProps)
            .then(() => Diners.findById({ _id: dinerId }))
            .then(diner => res.send(diner))
            .catch(next)
    }
} // end module exports