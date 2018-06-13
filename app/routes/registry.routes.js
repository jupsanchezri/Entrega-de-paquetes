module.exports = (app) => {
    const registries = require('../controllers/registry.controller.js');
    // Create a new registry
    app.post('/paquetes/:packageid/registros', registries.create);
    // List all registries
    app.get('/registros', registries.findAll);
    // Get a single registry by id
    app.get('/registros/:id', registries.findOne);
    
    // Report - List all registries
    app.get('/paquetes/:packageid/registros', registries.findAllByPackage);
};