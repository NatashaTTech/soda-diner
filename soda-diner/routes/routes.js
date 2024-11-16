const sodaController = require('../controllers/soda_controller');
const dinerController = require('../controllers/diner_controller');

module.exports = (app) => {
    // soda routes
    app.get('/api/sodas', sodaController.findAll)
    app.post('/api/sodas', sodaController.create)
    app.delete('/api/sodas/:id', sodaController.delete)
    
    // diner routes
    app.get('/api/diners', dinerController.findAll)
    app.post('/api/diners', dinerController.create)
    app.delete('/api/diners/:id', dinerController.delete)
    app.put('/api/diners/:id', dinerController.edit)
}