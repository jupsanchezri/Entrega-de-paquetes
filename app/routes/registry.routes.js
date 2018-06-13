module.exports = (app) => {
    const registries = require('../controllers/registry.controller.js');
    // Create a new registry
    app.post('/api/paquetes/:packageid/registros', registries.create);
    // List all registries
    app.get('/api/registros', registries.findAll);
    // Get a single registry by id
    app.get('/api/registros/:id', registries.findOne);
    
    // Report - List all registries
    app.get('/api/paquetes/:packageid/registros', registries.findAllByPackage);
};